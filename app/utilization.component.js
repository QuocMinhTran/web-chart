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
        this.options = {
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
        };
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
        ];
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