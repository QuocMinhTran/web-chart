import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';

import {ChartModule} from 'angular2-chartjs';
import {AmChartsDirective} from 'amcharts3-angular2/amcharts.directive';
//import {ChartsModule} from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { UtilizationConponent} from './utilization.component';
import { SwitchFrameStatsComponent} from './switchframestats.component';
import { DroppedFrameStatsComponent} from './droppedframestats.component';
import { SwitchPortMemoryUtilizationComponent} from './switchportmemoryutilization.component';
import {TopologyComponent} from './topology.component';
import {LatencyComponent} from './latency.component';
import {HomeComponent} from './home.component';
import {ActiveResourceTaskComponent} from './activeresourcetask.component';

@NgModule({
    imports: [
        //ChartsModule,
        ChartModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path:'',
                component:HomeComponent                
            },
            {
                path:'Utilization',
                component: UtilizationConponent
            },
            {
                path:'Switch-Frame-Stats',
                component: SwitchFrameStatsComponent
            },
            {
                path:'Dropped-Frame-Stats',
                component: DroppedFrameStatsComponent
            },
            {
                path:'Switch-Port-Memory-Utilization',
                component: SwitchPortMemoryUtilizationComponent
            },
            {
                path:'Topology',
                component: TopologyComponent
            },
            {
                path:'Latency',
                component: LatencyComponent
            },
            {
                path:'Active-Resource-Task',
                component:ActiveResourceTaskComponent
            }
        ]),
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        UtilizationConponent,
        SwitchFrameStatsComponent,
        SwitchPortMemoryUtilizationComponent,
        DroppedFrameStatsComponent,
        TopologyComponent,
        LatencyComponent,
        HomeComponent,
        ActiveResourceTaskComponent,
        AmChartsDirective
        ],
    bootstrap: [AppComponent]
})

export class AppModule{}