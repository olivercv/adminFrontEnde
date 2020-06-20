import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { NopageFoundComponent } from './shared/nopage-found/nopage-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardGuard } from './services/service.index';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [{
      path: '',
      loadChildren: './pages/pages.module#PagesModule'
    }]
  },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
