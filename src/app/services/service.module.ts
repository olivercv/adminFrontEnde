import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService, SidebarService, SharedService, UserService, LoginGuardGuard, PublicationService, NotificationService } from './service.index';
import { UploadFileService } from './upload-file/upload-file.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { ConvocatoryService } from './convocatory/convocatory.service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    PublicationService,
    NotificationService,
    ConvocatoryService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService
  ]
})
export class ServiceModule { }
