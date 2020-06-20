import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Módulos
import { SharedModule } from '../shared/shared.module';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// pipes module
import { PipesModule } from '../pipes/pipes.module';

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
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { PublicationsComponent } from './publications/publications.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PublicationFormComponent } from './publications/publication-form.component';
import { NotificationFormComponent } from './notifications/notification-form.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    GraficoDonaComponent,
    AccoutSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    ModalUploadComponent,
    PublicationsComponent,
    NotificationsComponent,
    PublicationFormComponent,
    NotificationFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(pagesRoutes),
    ChartsModule,
    ServiceModule,
    PipesModule

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
