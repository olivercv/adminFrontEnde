import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Módulos
import { SharedModule } from '../shared/shared.module';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routes';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ServiceModule } from '../services/service.module';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    GraficoDonaComponent,
    AccoutSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(pagesRoutes),
    ChartsModule,
    ServiceModule

  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
  providers: []
})
export class PagesModule { }
