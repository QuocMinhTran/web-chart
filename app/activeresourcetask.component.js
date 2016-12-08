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
var makeChart = function (_a) {
    var dataProvider = _a.dataProvider, fillColors = _a.fillColors;
    return {
        "type": "gantt",
        "theme": "light",
        "marginRight": 70,
        "period": "QQ",
        "dataDateFormat": "JJ:NN:SS",
        "columnWidth": 0.5,
        "valueAxis": {
            "type": "date"
        },
        "brightnessStep": 7,
        "graph": {
            "fillAlphas": 1,
            "lineAlpha": 1,
            "lineColor": "#fff",
            //"fillAlphas": 0.85,
            "balloonText": "<b>[[task]]</b>:<br />[[start]] -- [[end]]"
        },
        "rotate": true,
        "categoryField": "category",
        "segmentsField": "segments",
        "colorField": "color",
        "startDateField": "start",
        "endDateField": "end",
        "dataProvider": dataProvider,
        "valueScrollbar": {
            "autoGridCount": true
        },
        "chartCursor": {
            "cursorColor": "#55bb76",
            "valueBalloonsEnabled": false,
            "cursorAlpha": 0,
            "valueLineAlpha": 0.5,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "zoomable": false,
            "valueZoomable": true
        },
        "export": {
            "enabled": true
        }
    };
};
var ActiveResourceTaskComponent = (function () {
    //private chart: any;
    function ActiveResourceTaskComponent(getdataservice) {
        this.getdataservice = getdataservice;
        this.dataset = [];
    }
    ;
    ActiveResourceTaskComponent.prototype.ngOnInit = function () {
        this.DrawChart();
    };
    ActiveResourceTaskComponent.prototype.DrawChart = function () {
        var _this = this;
        this.getdataservice.getData(links_1.links[8])
            .subscribe(function (actask) {
            _this.getdataservice.getData(links_1.links[0])
                .subscribe(function (act) {
                _this.getdataservice.getData(links_1.links[3])
                    .subscribe(function (task) {
                    var taskdetail;
                    act.forEach(function (element, index) {
                        var category;
                        var segments = [];
                        for (var _i = 0, actask_1 = actask; _i < actask_1.length; _i++) {
                            var a = actask_1[_i];
                            if (element.ID == a.ACTIVERESOURCE_ID) {
                                category = element.NAME;
                                for (var _a = 0, task_1 = task; _a < task_1.length; _a++) {
                                    var b = task_1[_a];
                                    if (a.TASKDESCRIPTION_ID == b.ID) {
                                        //taskdetail = b.NAME;
                                        var block = { "start": a.STARTTIME,
                                            "end": a.ENDTIME,
                                            "color": "#b9783f",
                                            "task": b.NAME };
                                        segments.push(block);
                                    }
                                }
                            }
                        }
                        ;
                        _this.dataset.push({
                            "category": category,
                            "segments": segments
                        });
                    });
                    console.log(_this.dataset);
                    // this.chart = makeChart({
                    //     dataProvider: this.dataset,
                    //     fillColors: "red"
                    // })
                    // return this.chart;
                    AmCharts.useUTC = true;
                    var chart = AmCharts.makeChart("chartdiv", {
                        "type": "gantt",
                        "theme": "light",
                        "marginRight": 70,
                        "period": "DD",
                        "dataDateFormat": "YYYY-MM-DD",
                        "columnWidth": 0.5,
                        "valueAxis": {
                            "type": "date"
                        },
                        "brightnessStep": 7,
                        "graph": {
                            "fillAlphas": 1,
                            "lineAlpha": 1,
                            "lineColor": "#fff",
                            //"fillAlphas": 0.85,
                            "balloonText": "<b>[[task]]</b>:<br />[[open]] -- [[value]]"
                        },
                        "rotate": true,
                        "categoryField": "category",
                        "segmentsField": "segments",
                        "colorField": "color",
                        "startDateField": "start",
                        "endDateField": "end",
                        "dataProvider": _this.dataset,
                        "valueScrollbar": {
                            "autoGridCount": true
                        },
                        "chartCursor": {
                            "cursorColor": "#55bb76",
                            "valueBalloonsEnabled": false,
                            "cursorAlpha": 0,
                            "valueLineAlpha": 0.5,
                            "valueLineBalloonEnabled": true,
                            "valueLineEnabled": true,
                            "zoomable": false,
                            "valueZoomable": true
                        },
                        "export": {
                            "enabled": true
                        }
                    });
                    return chart;
                });
            });
        }, function (err) { return _this.error = err; });
    };
    ActiveResourceTaskComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'activeresourcetask',
            templateUrl: 'activeresourcetask.html',
            providers: [getdata_service_1.GetDataService]
        }), 
        __metadata('design:paramtypes', [getdata_service_1.GetDataService])
    ], ActiveResourceTaskComponent);
    return ActiveResourceTaskComponent;
}());
exports.ActiveResourceTaskComponent = ActiveResourceTaskComponent;
//# sourceMappingURL=activeresourcetask.component.js.map