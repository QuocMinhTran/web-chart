import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

declare let draw2d,$,Class:any; // neccessary variables for draw2d library
declare let vis: any;
@Component({
    moduleId: module.id,
    selector: 'topology',
    templateUrl: 'topology.html'
})
export class TopologyComponent {
    nodes: any;
    edges: any;
    network: any;
    canvas:any;
    ngOnInit() {
        //draw2d library
        //draw2d library
        // this.canvas = new draw2d.Canvas("myDiagram");
        // this.canvas.installEditPolicy(new draw2d.policy.canvas.FadeoutDecorationPolicy());
        var createConnection = function () {
            var con = new draw2d.Connection({
                stroke: 3,
                outlineStroke: 1,
                outlineColor: "#303030",
                color: "91B93E",
                router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
            });
            return con;
        }
        var MyConnection = draw2d.Connection.extend({

            init: function (attr) {
                this._super(attr);

                this.setRouter(new draw2d.layout.connection.InteractiveManhattanConnectionRouter());
                this.setOutlineStroke(1);
                this.setOutlineColor("#303030");
                this.setStroke(5);
                this.setColor('#00A8F0');
                this.setRadius(20);
            },

            /**
             * @method
             * called by the framework if the figure should show the contextmenu.</br>
             * The strategy to show the context menu depends on the plattform. Either loooong press or
             * right click with the mouse.
             * 
             * @param {Number} x the x-coordinate to show the menu
             * @param {Number} y the y-coordinate to show the menu
             * @since 1.1.0
             */
            onContextMenu: function (x, y) {
                $.contextMenu({
                    selector: 'body',
                    events:
                    {
                        hide: function () { $.contextMenu('destroy'); }
                    },
                    callback: $.proxy(function (key, options) {
                        switch (key) {
                            case "red":
                                this.setColor('#f3546a');
                                break;
                            case "green":
                                this.setColor('#b9dd69');
                                break;
                            case "blue":
                                this.setColor('#00A8F0');
                                break;
                            case "delete":
                                // without undo/redo support
                                //     this.getCanvas().remove(this);

                                // with undo/redo support
                                var cmd = new draw2d.command.CommandDelete(this);
                                this.getCanvas().getCommandStack().execute(cmd);
                            default:
                                break;
                        }

                    }, this),
                    x: x,
                    y: y,
                    items:
                    {
                        "red": { name: "Red" },
                        "green": { name: "Green" },
                        "blue": { name: "Blue" },
                        "sep1": "---------",
                        "delete": { name: "Delete" }
                    }
                });
            }

        });

        var CommonShape = draw2d.shape.layout.VerticalLayout.extend({
            NAME: "CommonShape",
            init: function (attr) {
                this._super($.extend({ bgColor: "black", color: "brown", stroke: 1, radius: 3 }), attr);
                this.classLabel = new draw2d.shape.basic.Label({
                    text: "ClassName",
                    stroke: 1,
                    fontColor: "#5856d6",
                    bgColor: "#f7f7f7",
                    radius: this.getRadius(),
                    padding: 10,
                    resizeable: true,
                    editor: new draw2d.ui.LabelInplaceEditor()
                });
                this.add(this.classLabel);
            },
            setName: function (name) {
                this.classLabel.setText(name);

                return this;
            },
        });

        var TableShape = draw2d.shape.layout.VerticalLayout.extend({

            NAME: "TableShape",

            init: function (attr) {
                this._super($.extend({ bgColor: "#dbddde", color: "#d7d7d7", stroke: 1, radius: 3 }, attr));


                this.classLabel = new draw2d.shape.basic.Label({
                    text: "ClassName",
                    stroke: 1,
                    fontColor: "#5856d6",
                    bgColor: "#f7f7f7",
                    radius: this.getRadius(),
                    padding: 10,
                    resizeable: true,
                    editor: new draw2d.ui.LabelInplaceEditor()
                });


                this.add(this.classLabel);
            },


            /**
             * @method
             * Add an entity to the db shape
             * 
             * @param {String} txt the label to show
             * @param {Number} [optionalIndex] index where to insert the entity
             */
            addEntity: function (txt, optionalIndex) {
                var label = new draw2d.shape.basic.Label({
                    text: txt,
                    stroke: 0,
                    radius: 0,
                    bgColor: null,
                    padding: { left: 10, top: 3, right: 10, bottom: 5 },
                    fontColor: "#4a4a4a",
                    resizeable: true,
                    editor: new draw2d.ui.LabelEditor()
                });

                //        label.installEditor(new draw2d.ui.LabelEditor());
                var inputLocator = new draw2d.layout.locator.InputPortLocator();
                    var outputLocator = new draw2d.layout.locator.OutputPortLocator();
                var input = label.createPort("hybrid",inputLocator);
                var output = label.createPort("hybrid",outputLocator);

                input.setName("input_" + label.id);
                output.setName("output_" + label.id);

                var _table = this;
                label.on("contextmenu", function (emitter, event) {
                    $.contextMenu({
                        selector: 'body',
                        events:
                        {
                            hide: function () { $.contextMenu('destroy'); }
                        },
                        callback: $.proxy(function (key, options) {
                            switch (key) {
                                case "rename":
                                    setTimeout(function () {
                                        emitter.onDoubleClick();
                                    }, 10);
                                    break;
                                case "new":
                                    setTimeout(function () {
                                        _table.addEntity("_new_").onDoubleClick();
                                    }, 10);
                                    break;
                                case "delete":
                                    // with undo/redo support
                                    var cmd = new draw2d.command.CommandDelete(emitter);
                                    emitter.getCanvas().getCommandStack().execute(cmd);
                                default:
                                    break;
                            }

                        }, this),
                        x: event.x,
                        y: event.y,
                        items:
                        {
                            "rename": { name: "Rename" },
                            "new": { name: "New Entity" },
                            "sep1": "---------",
                            "delete": { name: "Delete" }
                        }
                    });
                });

                if ($.isNumeric(optionalIndex)) {
                    this.add(label, null, optionalIndex + 1);
                }
                else {
                    this.add(label);
                }

                return label;
            },

            /**
             * @method
             * Remove the entity with the given index from the DB table shape.<br>
             * This method removes the entity without care of existing connections. Use
             * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
             * 
             * @param {Number} index the index of the entity to remove
             */
            removeEntity: function (index) {
                this.remove(this.children.get(index + 1).figure);
            },

            /**
             * @method
             * Returns the entity figure with the given index
             * 
             * @param {Number} index the index of the entity to return
             */
            getEntity: function (index) {
                return this.children.get(index + 1).figure;
            },


            /**
             * @method
             * Set the name of the DB table. Visually it is the header of the shape
             * 
             * @param name
             */
            setName: function (name) {
                this.classLabel.setText(name);

                return this;
            },


            /**
             * @method 
             * Return an objects with all important attributes for XML or JSON serialization
             * 
             * @returns {Object}
             */
            getPersistentAttributes: function () {
                var memento = this._super();

                memento.name = this.classLabel.getText();
                memento.entities = [];
                this.children.each(function (i, e) {

                    if (i > 0) { // skip the header of the figure
                        memento.entities.push({
                            text: e.figure.getText(),
                            id: e.figure.id
                        });
                    }
                });

                return memento;
            },

            /**
             * @method 
             * Read all attributes from the serialized properties and transfer them into the shape.
             *
             * @param {Object} memento
             * @return
             */
            setPersistentAttributes: function (memento) {
                this._super(memento);

                this.setName(memento.name);

                if (typeof memento.entities !== "undefined") {
                    $.each(memento.entities, $.proxy(function (i, e) {
                        var entity = this.addEntity(e.text);
                        entity.id = e.id;
                        entity.getInputPort(0).setName("input_" + e.id);
                        entity.getOutputPort(0).setName("output_" + e.id);
                    }, this));
                }

                return this;
            }

        });


        var View = draw2d.Canvas.extend({

            init: function (id) {
                this._super(id, 2000, 2000);

                this.setScrollArea("#" + id);
            },


            /**
             * @method
             * Called if the user drop the droppedDomNode onto the canvas.<br>
             * <br>
             * Draw2D use the jQuery draggable/droppable lib. Please inspect
             * http://jqueryui.com/demos/droppable/ for further information.
             * 
             * @param {HTMLElement} droppedDomNode The dropped DOM element.
             * @param {Number} x the x coordinate of the drop
             * @param {Number} y the y coordinate of the drop
             * @param {Boolean} shiftKey true if the shift key has been pressed during this event
             * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
             * @private
             **/
            onDrop: function (droppedDomNode, x, y, shiftKey, ctrlKey) {
                var type = $(droppedDomNode).data("shape");
                console.log(type);
                var figure = eval("new " + type + "();");
                if (type === "TableShape") {
                    figure.addEntity("id");
                }
                if (type === "CommonShape") {
                    var inputLocator = new draw2d.layout.locator.InputPortLocator();
                    var outputLocator = new draw2d.layout.locator.OutputPortLocator();
                    figure.createPort("hybrid", inputLocator);
                    figure.createPort("hybrid", outputLocator);
                }
                figure.setName("NewTable");

                // create a command for the undo/redo support
                var command = new draw2d.command.CommandAdd(this, figure, x, y);
                this.getCommandStack().execute(command);
            }
        });
        var Toolbar = Class.extend({

            init: function (elementId, view) {
                this.html = $("#" + elementId);
                this.view = view;

                // register this class as event listener for the canvas
                // CommandStack. This is required to update the state of 
                // the Undo/Redo Buttons.
                //
                view.getCommandStack().addEventListener(this);

                // Register a Selection listener for the state hnadling
                // of the Delete Button
                //
                view.on("select", $.proxy(this.onSelectionChanged, this));

                // Inject the UNDO Button and the callbacks
                //
                this.undoButton = $("<button class='gray'>Undo</button>");
                this.html.append(this.undoButton);
                this.undoButton.click($.proxy(function () {
                    this.view.getCommandStack().undo();
                }, this));

                // Inject the REDO Button and the callback
                //
                this.redoButton = $("<button class='gray'>Redo</button>");
                this.html.append(this.redoButton);
                this.redoButton.click($.proxy(function () {
                    this.view.getCommandStack().redo();
                }, this));

                this.delimiter = $("<span class='toolbar_delimiter'>&nbsp;</span>");
                this.html.append(this.delimiter);

                // Inject the DELETE Button
                //
                this.deleteButton = $("<button class='gray'>Delete</button>");
                this.html.append(this.deleteButton);
                this.deleteButton.click($.proxy(function () {
                    var node = this.view.getPrimarySelection();
                    var command = new draw2d.command.CommandDelete(node);
                    this.view.getCommandStack().execute(command);
                }, this));

                this.disableButton(this.undoButton, true);
                this.disableButton(this.redoButton, true);
                this.disableButton(this.deleteButton, true);

                this.html.append($("<div id='toolbar_hint'>Drag the shape to the canvas to create new table</div>"));
            },

            /**
             * @method
             * Called if the selection in the cnavas has been changed. You must register this
             * class on the canvas to receive this event.
             *
             * @param {draw2d.Canvas} emitter
             * @param {Object} event
             * @param {draw2d.Figure} event.figure
             */
            onSelectionChanged: function (emitter, event) {
                this.disableButton(this.deleteButton, event.figure === null);
            },

            /**
             * @method
             * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail() 
             * can be used to identify the type of event which has occurred.
             * 
             * @template
             * 
             * @param {draw2d.command.CommandStackEvent} event
             **/
            stackChanged: function (event) {
                this.disableButton(this.undoButton, !event.getStack().canUndo());
                this.disableButton(this.redoButton, !event.getStack().canRedo());
            },

            disableButton: function (button, flag) {
                button.prop("disabled", flag);
                if (flag) {
                    button.addClass("disabled");
                }
                else {
                    button.removeClass("disabled");
                }
            }
        });

        var Application = Class.extend(
            {
                NAME: "example.Application",

                /**
                 * @constructor
                 * 
                 * @param {String} canvasId the id of the DOM element to use as paint container
                 */
                init: function () {
                    this.view = new View("canvas");
                    this.toolbar = new Toolbar("toolbar", this.view);
                }


            });
        var routerToUse = new draw2d.layout.connection.InteractiveManhattanConnectionRouter();
        var app = new Application();
        app.view.installEditPolicy(new draw2d.policy.canvas.ShowGridEditPolicy());

        app.view.installEditPolicy(new draw2d.policy.canvas.SnapToGeometryEditPolicy());
        app.view.installEditPolicy(new draw2d.policy.canvas.SnapToInBetweenEditPolicy());
        app.view.installEditPolicy(new draw2d.policy.canvas.SnapToCenterEditPolicy());
        app.view.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function () {
                var connection = new draw2d.Connection({
                    stroke: 3,
                    outlineStroke: 1,
                    outlineColor: "#303030",
                    color: "91B93E",
                    router: routerToUse
                });
                return connection;
            }
        }));


        /*this.canvas.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
            createConnection: function () {
                return new MyConnection();
            }
        }));
        // Add input and output ports to any shape via generic API calls 
        // and custom locators 
        //
        var d = new draw2d.shape.basic.Rectangle({ width: 50, height: 100, x: 100, y: 100 });
        var inputLocator = new draw2d.layout.locator.InputPortLocator();
        var outputLocator = new draw2d.layout.locator.OutputPortLocator();

        d.createPort("hybrid", inputLocator);
        d.createPort("hybrid", inputLocator);
        d.createPort("hybrid", outputLocator);
        d.createPort("hybrid", outputLocator);

        this.canvas.add(d);
        this.canvas.add(new draw2d.shape.basic.Label({ text: "Add ports to the shape with a given locator", x: 230, y: 130 }));



        // add input and output ports via generic API calls and DEFAULT 
        // locators. The default locator arrange input on the left and ouput on the right 
        // side of the shape
        //
        var d2 = new draw2d.shape.basic.Diamond({ width: 50, height: 60, x: 100, y: 300 });
        this.canvas.add(d2);
        d2.createPort("input");
        d2.createPort("output");

        this.canvas.add(new draw2d.shape.basic.Label({ text: "Add ports to the shape after canvas assignment with default locator", x: 230, y: 330 }));



        // create my own implementation for the locators and use this for the port position
        // calculation 
        // 
        var MyInputPortLocator = draw2d.layout.locator.PortLocator.extend({
            init: function () {
                this._super();
            },
            relocate: function (index, figure) {
                this.applyConsiderRotation(figure, figure.getParent().getWidth() / 2, 0);
            }
        });


        var MyOutputPortLocator = draw2d.layout.locator.PortLocator.extend({
            init: function () {
                this._super();
            },
            relocate: function (index, figure) {
                var p = figure.getParent();

                this.applyConsiderRotation(figure, p.getWidth() / 2, p.getHeight());
            }
        });

        var topBottom = new draw2d.shape.basic.Rectangle({ width: 50, height: 100, x: 100, y: 500 });
        topBottom.createPort("hybrid", new MyInputPortLocator());
        topBottom.createPort("hybrid", new MyOutputPortLocator());

        this.canvas.add(topBottom);
        this.canvas.add(new draw2d.shape.basic.Label({ text: "Add ports to the shape with a custom locator", x: 230, y: 530 }));*/

       // visjs library
        // this.nodes = new vis.DataSet([
        //     { id: 1, value: 3, label: 'Thomas', shape: 'dot', group: 0 },
        //     { id: 2, value: 4, label: 'Tom', shape: 'square', group: 1 },
        // ]);
        // let newnode = { id: 3, value: 2, label: 'Minh', shape: 'diamond', group: 1, size: 200 };
        // console.log(this.nodes);
        // console.log(newnode);
        // this.nodes.add(newnode);
        // this.nodes.update([{ id: 3, color: { background: 'white' } }]);
        // this.edges = new vis.DataSet([
        //     { id: 1, from: 1, to: 2 },
        //     { id: 2, from: 2, to: 3 }
        // ])
        // let options = {
        //     layout: { randomSeed: 2 },
        //     physics: false,
        //     nodes: {
        //         font: {
        //             size: 12,
        //             face: 'Times New Roman'
        //         }
        //     },
        //     edges: {
        //         color: { inherit: true },
        //         width: 1,
        //         smooth: {
        //             type: 'straightCross',
        //             roundness: 0
        //         }
        //     },
        //     manipulation: {
        //         addEdge(data, callback) {
        //             if (data.from == data.to) {
        //                 var r = confirm('Do you want to connect the node to itself?');
        //                 if (r == true) {
        //                     callback(data);
        //                 }
        //             } else {
        //                 callback(data);
        //             }
        //         },
        //         /*addNode: function (data, callback) {
        //             // filling in the popup DOM elements
        //             document.getElementById('operation').innerHTML = "Add Node";
        //             (<HTMLInputElement>document.getElementById('node-id')).value = data.id;
        //             (<HTMLInputElement>document.getElementById('node-label')).value = data.label;
        //             document.getElementById('saveButton').addEventListener('click', function () {
        //                 data.id = (<HTMLInputElement>document.getElementById('node-id')).value;
        //                 data.label = (<HTMLInputElement>document.getElementById('node-label')).value;
        //                 document.getElementById('saveButton').onclick = null;
        //                 document.getElementById('cancelButton').onclick = null;
        //                 document.getElementById('network-popUp').style.display = 'none';
        //                 callback(data);
        //             });
        //             document.getElementById('cancelButton').addEventListener('click', function () {
        //                 document.getElementById('saveButton').onclick = null;
        //                 document.getElementById('cancelButton').onclick = null;
        //                 document.getElementById('network-popUp').style.display = 'none';
        //             });//cannot bind
        //             document.getElementById('network-popUp').style.display = 'block';
        //         },
        //         editNode: function (data, callback) {
        //             // filling in the popup DOM elements
        //             document.getElementById('operation').innerHTML = "Edit Node";
        //             (<HTMLInputElement>document.getElementById('node-id')).value = data.id;
        //             (<HTMLInputElement>document.getElementById('node-label')).value = data.label;
        //             document.getElementById('saveButton').onclick = this.saveData.bind(this, data, callback);
        //             document.getElementById('cancelButton').onclick = this.cancelEdit.bind(this, callback);
        //             document.getElementById('network-popUp').style.display = 'block';
        //         },*/
        //     }
        // };
        // let data = {
        //     nodes: this.nodes,
        //     edges: this.edges
        // };
        // this.network = new vis.Network(document.getElementById('mynetwork'), data, options);
        // this.network.on("selectNode",function(params){
        //     //let nodeInfo = JSON.stringify(params,null,4);
        //     console.log(params);
            
        //     //console.log(nodeInfo);
        //     (<HTMLInputElement>document.getElementById('node-id')).value = params.nodes;
        //     (<HTMLInputElement>document.getElementById('node-label')).value = '';
        //     (<HTMLInputElement>document.getElementById('node-shape')).value='';
        // });
        // this.network.on("selectEdge",function(params){
        //     //let nodeInfo = JSON.stringify(params,null,4);
        //     console.log(params);
            
        //     //console.log(nodeInfo);
        //     (<HTMLInputElement>document.getElementById('edge-id')).value = params.edges;
        //     (<HTMLInputElement>document.getElementById('edge-from')).value = '';
        //     (<HTMLInputElement>document.getElementById('edge-to')).value='';
        // })
        // /*function saveData(data, callback) {
        //     data.id = (<HTMLInputElement>document.getElementById('node-id')).value;
        //     data.label = (<HTMLInputElement>document.getElementById('node-label')).value;
        //     this.clearPopUp();
        //     callback(data);
        // };
        // function clearPopUp() {
        //     document.getElementById('saveButton').onclick = null;
        //     document.getElementById('cancelButton').onclick = null;
        //     document.getElementById('network-popUp').style.display = 'none';
        // };
        // function cancelEdit(callback) {
        //     this.clearPopUp();
        //     callback(null);
        // }*/
    };

    //draw2d functions
    shapeClick() {
        let newShape = new draw2d.shape.basic.Rectangle({ width: 50, height: 100, x: 100, y: 50 });
        this.canvas.add(newShape);
        newShape.createPort("input");
        newShape.createPort("output");
    }

    //visjs methods
    // addNode() {
    //      try {
    //          var popup = document.getElementById('myPopup');
    //          if ((<HTMLInputElement>document.getElementById('node-id')).value != '') {
    //              this.nodes.add({
    //                  id: (<HTMLInputElement>document.getElementById('node-id')).value,
    //                  label: (<HTMLInputElement>document.getElementById('node-label')).value,
    //                  shape: (<HTMLInputElement>document.getElementById('node-shape')).value.toLowerCase(),
    //                  x:0,
    //                  y:0
 
    //              });
    //              popup.classList.toggle('hidden');
    //          } else {
    //              popup.classList.toggle('show');
    //          }
    //          console.log((<HTMLInputElement>document.getElementById('node-shape')).value.toLowerCase())
    //      }
    //      catch (err) {
    //          alert(err);
    //      }
    //  }
    //  updateNode() {
    //      try {
    //          console.log(this.nodes.get((<HTMLInputElement>document.getElementById('node-id')).value))
    //          if (this.nodes.get((<HTMLInputElement>document.getElementById('node-id')).value) !== null) {
    //              this.nodes.update({
    //                  id: (<HTMLInputElement>document.getElementById('node-id')).value,
    //                  label: (<HTMLInputElement>document.getElementById('node-label')).value,
    //                  shape: (<HTMLInputElement>document.getElementById('node-shape')).value.toLowerCase()
    //              })
    //          } else { alert('This node does not exist yet') };
    //          console.log(this.nodes);
    //      }
    //      catch (err) {
    //          alert(err);
    //      }
    //  }
    //  removeNode() {
    //      try {
    //          if (this.nodes.get((<HTMLInputElement>document.getElementById('node-id')).value) !== null) {
    //              this.nodes.remove({
    //                  id: (<HTMLInputElement>document.getElementById('node-id')).value,
    //              })
    //          } else {
    //              alert('You cannot delete an unexist node')
    //          }
    //      }
    //      catch (err) {
    //          alert(err);
    //      }
    //  }
    //  addEdge() {
    //      try {
    //          this.edges.add({
    //              id: (<HTMLInputElement>document.getElementById('edge-id')).value,
    //              from: (<HTMLInputElement>document.getElementById('edge-from')).value,
    //              to: (<HTMLInputElement>document.getElementById('edge-to')).value,
    //              arrows: 'to'
    //          });
    //      }
    //      catch (err) {
    //          alert(err);
    //      }
    //  }
    //  updateEdge() {
    //      try {
    //          this.edges.update({
    //              id: (<HTMLInputElement>document.getElementById('edge-id')).value,
    //              from: (<HTMLInputElement>document.getElementById('edge-from')).value,
    //              to: (<HTMLInputElement>document.getElementById('edge-to')).value,
    //              arrows: 'to'
    //          });
    //      }
    //      catch (err) {
    //          alert(err);
    //      }
    //  }
    //  removeEdge() {
    //      try {
    //          this.edges.remove({ id: (<HTMLInputElement>document.getElementById('edge-id')).value });
    //      }
    //      catch (err) {
    //          alert(err);
    //      }
    //  }

}