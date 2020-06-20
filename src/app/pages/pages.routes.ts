import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { PublicationsComponent } from './publications/publications.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PublicationFormComponent } from './publications/publication-form.component';
import { NotificationFormComponent } from './notifications/notification-form.component';


export const pagesRoutes: Routes = [
          { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}  },
          { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}  },
          { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}  },
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}  },
          { path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes del tema'}  },
          { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}  },
          // Mantenimientos
          { path: 'users', component: UsersComponent, data: {titulo: 'Mantenimiento de usuarios'}  },
          { path: 'publications', component: PublicationsComponent, data: {titulo: 'Publicaciones web'}  },
          { path: 'publication/:id', component: PublicationFormComponent, data: {titulo: 'Formulario de publicación de noticias'}  },
          { path: 'notifications', component: NotificationsComponent, data: {titulo: 'Notificaciones web'}  },
          { path: 'notification/:id', component: NotificationFormComponent, data: {titulo: 'Formulario de notificaciones web'}  },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

