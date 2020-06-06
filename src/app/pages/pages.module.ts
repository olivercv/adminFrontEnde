import { NgModule } from '@angular/core';
// Módulos
import { SharedModule } from '../shared/shared.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { pagesRoutes } from './pages.routes';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ]
})
export class PagesModule { }
