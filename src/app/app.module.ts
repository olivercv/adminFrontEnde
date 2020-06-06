import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Módulos
import { PagesModule } from './pages/pages.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    MatSliderModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
