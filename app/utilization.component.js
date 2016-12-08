"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var getdata_service_1 = require('./getdata.service');
var links_1 = require('./links');
require('./rxjs-operators');
require('rxjs/Rx');
var UtilizationConponent = (function () {
    function UtilizationConponent(getdataservice) {
        this.getdataservice = getdataservice;
    }
    UtilizationConponent.prototype.ngOnInit = function () {
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
        var temp = 5;
        var $ = go.GraphObject.make;
        var myDiagram = $(go.Diagram, "myDiagram", // create a Diagram for the DIV HTML element
        {
            "clickCreatingTool.archetypeNodeData": {},
            "clickCreatingTool.insertPart": function (loc) {
                this.archetypeNodeData = {
                    key: temp + 1, text: "New Node", color: "lightblue"
                };
                return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
            },
            initialContentAlignment: go.Spot.Center,
            "linkingTool.isEnabled": false,
            "linkingTool.direction": go.LinkingTool.ForwardsOnly,
            "undoManager.isEnabled": true // enable undo & redo
        });
        myDiagram.linkTemplate =
            $(go.Link, { routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10, reshapable: true, toShortLength: 7 }, new go.Binding("points").makeTwoWay(), 
            // mark each Shape to get the link geometry with isPanelMain: true
            $(go.Shape, { isPanelMain: true, stroke: "black", strokeWidth: 5 }), $(go.Shape, { isPanelMain: true, stroke: "gray", strokeWidth: 3 }), $(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 1, name: "PIPE", strokeDashArray: [10, 10] }), $(go.Shape, { toArrow: "Triangle", fill: "black", stroke: null }));
        myDiagram.nodeTemplate =
            $(go.Node, "Auto", {
                desiredSize: new go.Size(80, 80),
                // rearrange the link points evenly along the sides of the nodes as links are
                // drawn or reconnected -- these event handlers only make sense when the fromSpot
                // and toSpot are Spot.xxxSides
                linkConnected: function (node, link, port) {
                    if (link.fromNode !== null)
                        link.fromNode.invalidateConnectedLinks();
                    if (link.toNode !== null)
                        link.toNode.invalidateConnectedLinks();
                },
                linkDisconnected: function (node, link, port) {
                    if (link.fromNode !== null)
                        link.fromNode.invalidateConnectedLinks();
                    if (link.toNode !== null)
                        link.toNode.invalidateConnectedLinks();
                },
                locationSpot: go.Spot.Center
            }, new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, {
                name: "SHAPE",
                strokeWidth: 0,
                fill: "lightgray",
                portId: "",
                // use the following property if you want users to draw new links
                // interactively by dragging from the Shape, and re-enable the LinkingTool
                // in the initialization of the Diagram
                //cursor: "pointer",
                fromSpot: go.Spot.AllSides, fromLinkable: true,
                fromLinkableDuplicates: true, fromLinkableSelfNode: true,
                toSpot: go.Spot.AllSides, toLinkable: true,
                toLinkableDuplicates: true, toLinkableSelfNode: true
            }, new go.Binding("fill", "color").makeTwoWay()), $(go.TextBlock, {
                name: "TEXTBLOCK",
                margin: 3,
                // use the following property if you want users to interactively start
                // editing the text by clicking on it or by F2 if the node is selected:
                //editable: true,
                overflow: go.TextBlock.OverflowEllipsis,
                maxLines: 5
            }, new go.Binding("text").makeTwoWay()));
        // a selected node shows an Adornment that includes both a blue border
        // and a row of Buttons above the node
        myDiagram.nodeTemplate.selectionAdornmentTemplate =
            $(go.Adornment, "Spot", $(go.Panel, "Auto", $(go.Shape, { stroke: "dodgerblue", strokeWidth: 2, fill: null }), $(go.Placeholder)), $(go.Panel, "Horizontal", { alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom }, $("Button", { click: editText }, // defined below, to support editing the text of the node
            $(go.TextBlock, "t", { font: "bold 10pt sans-serif", desiredSize: new go.Size(15, 15), textAlign: "center" })), $("Button", { click: changeColor, "_buttonFillOver": "transparent" }, // defined below, to support changing the color of the node
            new go.Binding("ButtonBorder.fill", "color", nextColor), $(go.Shape, { fill: null, stroke: null, desiredSize: new go.Size(14, 14) })), $("Button", {
                click: drawLink,
                actionMove: drawLink // drag from Button to the target node
            }, $(go.Shape, { geometryString: "M0 0 L8 0 8 12 14 12 M12 10 L14 12 12 14" })), $("Button", {
                actionMove: dragNewNode,
                _dragData: { text: "a Node", color: "lightgray" },
                click: clickNewNode // defined below, to support a click on the button
            }, $(go.Shape, { geometryString: "M0 0 L3 0 3 10 6 10 x F1 M6 6 L14 6 14 14 6 14z", fill: "gray" }))));
        function editText(e, button) {
            var node = button.part.adornedPart;
            e.diagram.commandHandler.editTextBlock(node.findObject("TEXTBLOCK"));
        }
        // used by nextColor as the list of colors through which we rotate
        var myColors = ["lightgray", "lightblue", "lightgreen", "yellow", "orange", "pink"];
        // used by both the Button Binding and by the changeColor click function
        function nextColor(c) {
            var idx = myColors.indexOf(c);
            if (idx < 0)
                return "lightgray";
            if (idx >= myColors.length - 1)
                idx = 0;
            return myColors[idx + 1];
        }
        function changeColor(e, button) {
            var node = button.part.adornedPart;
            var shape = node.findObject("SHAPE");
            if (shape === null)
                return;
            node.diagram.startTransaction("Change color");
            shape.fill = nextColor(shape.fill);
            button["_buttonFillNormal"] = nextColor(shape.fill); // update the button too
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
            if (!data)
                return;
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
                if (!data)
                    return;
                e.diagram.startTransaction("button drag"); // see doDeactivate, below
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
            go.DraggingTool.prototype.doDeactivate.call(tool); // call the base method
        };
        myDiagram.model = new go.GraphLinksModel([
            { key: 1, text: "Alpha", color: "lightblue", location: "0 0" },
            { key: 2, text: "Beta", color: "orange", location: "140 0" },
            { key: 3, text: "Gamma", color: "lightgreen", location: "0 140" },
            { key: 4, text: "Delta", color: "pink", location: "140 140" }
        ], [
            { from: 1, to: 2 }
        ]);
    };
    UtilizationConponent.prototype.getUtilization = function () {
        var _this = this;
        this.getdataservice.getData(links_1.links[5])
            .subscribe(function (res) {
            _this.getdataservice.getData(links_1.links[0]).subscribe(function (activesource) {
                var labelsArray = [];
                var dataArray = [];
                for (var _i = 0, activesource_1 = activesource; _i < activesource_1.length; _i++) {
                    var a = activesource_1[_i];
                    for (var _a = 0, res_1 = res; _a < res_1.length; _a++) {
                        var b = res_1[_a];
                        if (a.ID == b.ACTIVERESOURCE_ID) {
                            labelsArray.push(a.NAME);
                            dataArray.push(b.PERCENTAGE);
                        }
                    }
                }
                console.log(labelsArray);
                console.log(dataArray);
                return _this.data = {
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
                };
            });
        }, function (err) { return _this.error = err; });
    };
    UtilizationConponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-utilization',
            templateUrl: 'utilization.html',
            providers: [getdata_service_1.GetDataService]
        }), 
        __metadata('design:paramtypes', [getdata_service_1.GetDataService])
    ], UtilizationConponent);
    return UtilizationConponent;
}());
exports.UtilizationConponent = UtilizationConponent;
//# sourceMappingURL=utilization.component.js.map