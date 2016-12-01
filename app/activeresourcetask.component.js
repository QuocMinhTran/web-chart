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
    function ActiveResourceTaskComponent() {
        this.id = "chartdiv";
        this.data = [{
                "category": "Module #1",
                "segments": [{
                        "start": 1,
                        "end": 2,
                        "color": "#b9783f",
                        "task": "Gathering requirements"
                    }, {
                        "start": 2,
                        "end": 3,
                        "task": "Producing specifications"
                    }, {
                        "start": 5,
                        "end": 6,
                        "task": "Development"
                    }, {
                        "start": 6,
                        "end": 10,
                        "task": "Testing and QA"
                    }]
            }, {
                "category": "Module #2",
                "segments": [{
                        "start": 2,
                        "end": 3,
                        "color": "#cc4748",
                        "task": "Gathering requirements"
                    }, {
                        "start": 5,
                        "end": 6,
                        "task": "Producing specifications"
                    }, {
                        "start": 7,
                        "end": 9,
                        "task": "Development"
                    }, {
                        "start": 10,
                        "end": 12,
                        "task": "Testing and QA"
                    }]
            }, {
                "category": "Module #3",
                "segments": [{
                        "start": 3,
                        "end": 5,
                        "color": "#cd82ad",
                        "task": "Gathering requirements"
                    }, {
                        "start": 6,
                        "end": 8,
                        "task": "Producing specifications"
                    }, {
                        "start": 9,
                        "end": 11,
                        "task": "Development"
                    }, {
                        "start": 15,
                        "end": 19,
                        "task": "Testing and QA"
                    }]
            }, {
                "category": "Module #4",
                "segments": [{
                        "start": 6,
                        "end": 9,
                        "color": "#2f4074",
                        "task": "Gathering requirements"
                    }, {
                        "start": 11,
                        "end": 16,
                        "task": "Producing specifications"
                    }, {
                        "start": 16,
                        "end": 18,
                        "task": "Development"
                    }, {
                        "start": 19,
                        "end": 22,
                        "task": "Testing and QA"
                    }]
            }, {
                "category": "Module #5",
                "segments": [{
                        "start": 4,
                        "end": 6,
                        "color": "#448e4d",
                        "task": "Gathering requirements"
                    }, {
                        "start": 7,
                        "end": 9,
                        "task": "Producing specifications"
                    }, {
                        "start": 11,
                        "end": 15,
                        "task": "Development"
                    }, {
                        "start": 16,
                        "end": 18,
                        "task": "Testing and QA"
                    }]
            }];
        this.chart = makeChart({
            dataProvider: this.data,
            fillColors: "red"
        });
    }
    ActiveResourceTaskComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'activeresourcetask',
            templateUrl: 'activeresourcetask.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ActiveResourceTaskComponent);
    return ActiveResourceTaskComponent;
}());
exports.ActiveResourceTaskComponent = ActiveResourceTaskComponent;
//# sourceMappingURL=activeresourcetask.component.js.map