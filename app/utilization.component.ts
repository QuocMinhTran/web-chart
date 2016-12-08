import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { GetDataService } from './getdata.service';
import { links } from './links';

declare var cytoscape: any;
declare var d3: any;
import './rxjs-operators';
import 'rxjs/Rx';
@Component({
    moduleId: module.id,
    selector: 'my-utilization',
    templateUrl: 'utilization.html',
    providers: [GetDataService]
})
export class UtilizationConponent implements OnInit {
    // error: string;
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
        ];
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