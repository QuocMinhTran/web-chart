import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GetDataService } from './getdata.service';
import { links } from './links';

declare var cytoscape: any;
//declare var d3: any;
declare var go: any;
import './rxjs-operators';
import 'rxjs/Rx';
@Component({
    moduleId: module.id,
    selector: 'my-utilization',
    templateUrl: 'utilization.html',
    providers: [GetDataService]
})
export class UtilizationConponent implements OnInit {
    error: string;
    // type = 'bar';
    // data: any = {
    //     labels: [],
    //     datasets: []
    // };
    // options = {
    //     responsive: true,
    //     maintainAspectRatio: true
    // };
    options: any;
    data: any;
    constructor(private getdataservice: GetDataService) {
    }
    ngOnInit() {
        //this.getUtilization();  

        //Rickshaw library
        /*var graph = new Rickshaw.Graph({
            element: document.querySelector('#graph'),
            series: [
                {
                    color: 'steelblue',
                    data: [{ x: 0, y: 23 }, { x: 1, y: 15 }, { x: 2, y: 79 }]
                }, {
                    color: 'lightblue',
                    data: [{ x: 0, y: 30 }, { x: 1, y: 20 }, { x: 2, y: 64 }]
                }
            ]
        });

        graph.render();*/

        // NVD3 library
        /*this.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function (d) { return d.label; },
                y: function (d) { return d.value; },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format(',.4f')(d);
                },
                duration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: -10
                }
            }
        }
        this.data = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label": "A",
                        "value": -29.765957771107
                    },
                    {
                        "label": "B",
                        "value": 0
                    },
                    {
                        "label": "C",
                        "value": 32.807804682612
                    },
                    {
                        "label": "D",
                        "value": 196.45946739256
                    },
                    {
                        "label": "E",
                        "value": 0.19434030906893
                    },
                    {
                        "label": "F",
                        "value": -98.079782601442
                    },
                    {
                        "label": "G",
                        "value": -13.925743130903
                    },
                    {
                        "label": "H",
                        "value": -5.1387322875705
                    }
                ]
            }
        ];*/

        // gojs library
        let $ = go.GraphObject.make;
        let myDiagram = $(go.Diagram, "myDiagram",  // create a Diagram for the DIV HTML element
            {
                initialContentAlignment: go.Spot.Center,  // center the content
                "linkingTool.isEnabled": false,  // invoked explicitly by drawLink function, below
                "linkingTool.direction": go.LinkingTool.ForwardsOnly,  // only draw "from" towards "to"
                "undoManager.isEnabled": true  // enable undo & redo
            });

        myDiagram.linkTemplate =
            $(go.Link,
                { routing: go.Link.AvoidsNodes, corner: 5 },
                $(go.Shape, { strokeWidth: 1.5 }),
                $(go.Shape, { toArrow: "OpenTriangle" })
            );

        myDiagram.nodeTemplate =
            $(go.Node, "Auto",
                {
                    desiredSize: new go.Size(80, 80),
                    // rearrange the link points evenly along the sides of the nodes as links are
                    // drawn or reconnected -- these event handlers only make sense when the fromSpot
                    // and toSpot are Spot.xxxSides
                    linkConnected: function (node, link, port) {
                        if (link.fromNode !== null) link.fromNode.invalidateConnectedLinks();
                        if (link.toNode !== null) link.toNode.invalidateConnectedLinks();
                    },
                    linkDisconnected: function (node, link, port) {
                        if (link.fromNode !== null) link.fromNode.invalidateConnectedLinks();
                        if (link.toNode !== null) link.toNode.invalidateConnectedLinks();
                    },
                    locationSpot: go.Spot.Center
                },
                new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape,
                    {
                        name: "SHAPE",  // named so that changeColor can modify it
                        strokeWidth: 0,  // no border
                        fill: "lightgray",  // default fill color
                        portId: "",
                        // use the following property if you want users to draw new links
                        // interactively by dragging from the Shape, and re-enable the LinkingTool
                        // in the initialization of the Diagram
                        //cursor: "pointer",
                        fromSpot: go.Spot.AllSides, fromLinkable: true,
                        fromLinkableDuplicates: true, fromLinkableSelfNode: true,
                        toSpot: go.Spot.AllSides, toLinkable: true,
                        toLinkableDuplicates: true, toLinkableSelfNode: true
                    },
                    new go.Binding("fill", "color").makeTwoWay()),
                $(go.TextBlock,
                    {
                        name: "TEXTBLOCK",  // named so that editText can start editing it
                        margin: 3,
                        // use the following property if you want users to interactively start
                        // editing the text by clicking on it or by F2 if the node is selected:
                        //editable: true,
                        overflow: go.TextBlock.OverflowEllipsis,
                        maxLines: 5
                    },
                    new go.Binding("text").makeTwoWay())
            );

        // a selected node shows an Adornment that includes both a blue border
        // and a row of Buttons above the node
        myDiagram.nodeTemplate.selectionAdornmentTemplate =
            $(go.Adornment, "Spot",
                $(go.Panel, "Auto",
                    $(go.Shape, { stroke: "dodgerblue", strokeWidth: 2, fill: null }),
                    $(go.Placeholder)
                ),
                $(go.Panel, "Horizontal",
                    { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom },
                    $("Button",
                        { click: editText },  // defined below, to support editing the text of the node
                        $(go.TextBlock, "t",
                            { font: "bold 10pt sans-serif", desiredSize: new go.Size(15, 15), textAlign: "center" })
                    ),
                    $("Button",
                        { click: changeColor, "_buttonFillOver": "transparent" },  // defined below, to support changing the color of the node
                        new go.Binding("ButtonBorder.fill", "color", nextColor),
                        $(go.Shape,
                            { fill: null, stroke: null, desiredSize: new go.Size(14, 14) })
                    ),
                    $("Button",
                        { // drawLink is defined below, to support interactively drawing new links
                            click: drawLink,  // click on Button and then click on target node
                            actionMove: drawLink  // drag from Button to the target node
                        },
                        $(go.Shape,
                            { geometryString: "M0 0 L8 0 8 12 14 12 M12 10 L14 12 12 14" })
                    ),
                    $("Button",
                        {
                            actionMove: dragNewNode,  // defined below, to support dragging from the button
                            _dragData: { text: "a Node", color: "lightgray" },  // node data to copy
                            click: clickNewNode  // defined below, to support a click on the button
                        },
                        $(go.Shape,
                            { geometryString: "M0 0 L3 0 3 10 6 10 x F1 M6 6 L14 6 14 14 6 14z", fill: "gray" })
                    )
                )
            );

        function editText(e, button) {
            var node = button.part.adornedPart;
            e.diagram.commandHandler.editTextBlock(node.findObject("TEXTBLOCK"));
        }

        // used by nextColor as the list of colors through which we rotate
        var myColors = ["lightgray", "lightblue", "lightgreen", "yellow", "orange", "pink"];

        // used by both the Button Binding and by the changeColor click function
        function nextColor(c) {
            var idx = myColors.indexOf(c);
            if (idx < 0) return "lightgray";
            if (idx >= myColors.length - 1) idx = 0;
            return myColors[idx + 1];
        }

        function changeColor(e, button) {
            var node = button.part.adornedPart;
            var shape = node.findObject("SHAPE");
            if (shape === null) return;
            node.diagram.startTransaction("Change color");
            shape.fill = nextColor(shape.fill);
            button["_buttonFillNormal"] = nextColor(shape.fill);  // update the button too
            node.diagram.commitTransaction("Change color");
        }

        function drawLink(e, button) {
            var node = button.part.adornedPart;
            var tool = e.diagram.toolManager.linkingTool;
            tool.startObject = node.port;
            e.diagram.currentTool = tool;
            tool.doActivate();
        }

        // used by both clickNewNode and dragNewNode to create a node and a link
        // from a given node to the new node
        function createNodeAndLink(data, fromnode) {
            var diagram = fromnode.diagram;
            var model = diagram.model;
            var nodedata = model.copyNodeData(data);
            model.addNodeData(nodedata);
            var newnode = diagram.findNodeForData(nodedata);
            var linkdata = model.copyLinkData({});
            model.setFromKeyForLinkData(linkdata, model.getKeyForNodeData(fromnode.data));
            model.setToKeyForLinkData(linkdata, model.getKeyForNodeData(newnode.data));
            model.addLinkData(linkdata);
            diagram.select(newnode);
            return newnode;
        }

        // the Button.click event handler, called when the user clicks the "N" button
        function clickNewNode(e, button) {
            var data = button._dragData;
            if (!data) return;
            e.diagram.startTransaction("Create Node and Link");
            var fromnode = button.part.adornedPart;
            var newnode = createNodeAndLink(button._dragData, fromnode);
            newnode.location = new go.Point(fromnode.location.x + 200, fromnode.location.y);
            e.diagram.commitTransaction("Create Node and Link");
        }

        // the Button.actionMove event handler, called when the user drags within the "N" button
        function dragNewNode(e, button) {
            var tool = e.diagram.toolManager.draggingTool;
            if (tool.isBeyondDragSize()) {
                var data = button._dragData;
                if (!data) return;
                e.diagram.startTransaction("button drag");  // see doDeactivate, below
                var newnode = createNodeAndLink(data, button.part.adornedPart);
                newnode.location = e.diagram.lastInput.documentPoint;
                // don't commitTransaction here, but in tool.doDeactivate, after drag operation finished
                // set tool.currentPart to a selected movable Part and then activate the DraggingTool
                tool.currentPart = newnode;
                e.diagram.currentTool = tool;
                tool.doActivate();
            }
        }

        // using dragNewNode also requires modifying the standard DraggingTool so that it
        // only calls commitTransaction when dragNewNode started a "button drag" transaction;
        // do this by overriding DraggingTool.doDeactivate:
        var tool = myDiagram.toolManager.draggingTool;
        tool.doDeactivate = function () {
            // commit "button drag" transaction, if it is ongoing; see dragNewNode, above
            if (tool.diagram.undoManager.nestedTransactionNames.elt(0) === "button drag") {
                tool.diagram.commitTransaction();
            }
            go.DraggingTool.prototype.doDeactivate.call(tool);  // call the base method
        };


        myDiagram.model = new go.GraphLinksModel(
            [
                { key: 1, text: "Alpha", color: "lightblue", location: "0 0" },
                { key: 2, text: "Beta", color: "orange", location: "140 0" },
                { key: 3, text: "Gamma", color: "lightgreen", location: "0 140" },
                { key: 4, text: "Delta", color: "pink", location: "140 140" }
            ],
            [
                { from: 1, to: 2 }
            ]);
    }
    getUtilization(): void {
        this.getdataservice.getData(links[5])
            .subscribe(res => {
                this.getdataservice.getData(links[0]).subscribe(activesource => {
                    let labelsArray = [];
                    let dataArray = [];
                    for (let a of activesource) {
                        for (let b of res) {
                            if (a.ID == b.ACTIVERESOURCE_ID) {
                                labelsArray.push(a.NAME);
                                dataArray.push(b.PERCENTAGE);
                            }
                        }
                    }
                    console.log(labelsArray);
                    console.log(dataArray);
                    return this.data = {
                        labels: labelsArray,
                        datasets: [{
                            label: 'my database',
                            data: dataArray,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ]
                        }]
                    }
                })
            }, err => this.error = <any>err);
    }
}