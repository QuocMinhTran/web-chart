import { Component, OnInit } from '@angular/core';

import { GetDataService } from './getdata.service';
import { links } from './links';

declare var AmCharts: any;
interface Data {
    category: string;
    segments: Array<Block>;
}
interface Block {
    start: number,
    end: number,
    color: string,
    task: string
}
interface Configuration {
    dataProvider: Array<Data>;
    fillColors: string;
}

const makeChart = ({ dataProvider, fillColors }: Configuration) => {
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

@Component({
    moduleId: module.id,
    selector: 'activeresourcetask',
    templateUrl: 'activeresourcetask.html',
    providers: [GetDataService]
})
export class ActiveResourceTaskComponent implements OnInit {
    dataset = [];
    error: any;
    //private chart: any;
    constructor(private getdataservice: GetDataService) { };
    ngOnInit() {
        this.DrawChart();
    }
    DrawChart() {
        this.getdataservice.getData(links[8])
            .subscribe(actask => {
                this.getdataservice.getData(links[0])
                    .subscribe(act => {
                        this.getdataservice.getData(links[3])
                            .subscribe(task => {
                                let taskdetail: string;
                                act.forEach((element, index) => {
                                    let category = element.NAME;
                                    let segments = [];
                                    for (let a of actask) {
                                        if (element.ID == a.ACTIVERESOURCE_ID) {
                                            for (let b of task) {
                                                if (a.TASKDESCRIPTION_ID == b.ID) {
                                                    //taskdetail = b.NAME;
                                                    let block = {
                                                        "start": a.STARTTIME *1000,
                                                        "end": a.ENDTIME *1000,
                                                        "color": "#b9783f",
                                                        "task": b.NAME
                                                    };
                                                    segments.push(block);
                                                }
                                            }
                                        }
                                    };
                                    this.dataset.push({
                                        "category": category,
                                        "segments": segments
                                    })
                                });
                                console.log(this.dataset);
                                // this.chart = makeChart({
                                //     dataProvider: this.dataset,
                                //     fillColors: "red"
                                // })
                                // return this.chart;
                                AmCharts.useUTC = true;
                                var chart = AmCharts.makeChart("chartdiv", {
                                    "type": "gantt",
                                    "theme": "chalk",
                                    "period": "fff",
                                    "dataDateFormat": "YYYY-MM-DD HH:NN:SS",
                                    "balloonDateFormat": "QQQ",
                                    "columnWidth": 0.5,
                                    "marginBottom": 30,
                                    "valueAxis": {
                                        "type": "date",
                                        "minPeriod": "fff",
                                        "ignoreAxisWidth": true
                                    },
                                    "brightnessStep": 7,
                                    "graph": {
                                        "fillAlphas": 1,
                                        "balloonText": "<b>[[task]]</b>: [[start]]  - [[end]]"
                                    },
                                    "rotate": true,
                                    "categoryField": "category",
                                    "segmentsField": "segments",
                                    "colorField": "color",
                                    "startDate": "2015-01-01 00:00:00",
                                    "startField": "start",
                                    "endField": "end",
                                    "dataProvider": this.dataset,
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
                                        "enabled": true,
                                    }
                                });
                                console.log("hej");
                                return chart;
                            });

                    })
            }, err => this.error = <any>err);
    }

    /*private id: string = "chartdiv";

    private data: any = [{
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
    }]
    private chart = makeChart({
        dataProvider: this.data,
        fillColors:"red"
    })
    /*change() {
      this.chart = makeChart({
        dataProvider: this.data.map((x: Data) => {
          return {
            country: x.country,
            visits: Math.floor(Math.random() * 100),
            color: x.color
          };
        }),
        fillColors: "green"
      });
    }*/
    /*Onclick() {
        this.data.push({"category": "Module #6",
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
            }]})
            console.log(this.data);
        this.chart = makeChart({
        dataProvider: this.data,
        fillColors: "green"
      });
    }*/
}