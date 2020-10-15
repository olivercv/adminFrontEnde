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
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category/category-form.component';
import { ConvocatoryComponent } from './convocatory/convocatory.component';
import { ConvocatoryFormComponent } from './convocatory/convocatory-form.component';
import { RoleGuard } from '../services/guards/role.guard';


export const pagesRoutes: Routes = [
          { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}  },
          { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}  },
          { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}  },
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}  },
          { path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes del tema'}  },
          { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}  },
          // Mantenimientos
          { path: 'users', component: UsersComponent, canActivate: [RoleGuard] , data: { privileges: ['ADMIN_ROLE'], titulo: 'Mantenimiento de usuarios'}  },
          { path: 'publications', component: PublicationsComponent, canActivate: [RoleGuard], data: { privileges: ['PUBLI_ROLE', 'ADMIN_ROLE'], titulo: 'Publicaciones web'}  },
          { path: 'publication/:id', component: PublicationFormComponent, canActivate: [RoleGuard], data: { privileges: ['PUBLI_ROLE', 'ADMIN_ROLE'], titulo: 'Formulario de publicación de noticias'}  },
          { path: 'categories', component: CategoryComponent, canActivate: [RoleGuard], data: { privileges: ['ADMIN_ROLE'],titulo: 'Categorías de las publiicaciones'}  },
          { path: 'category/:id', component: CategoryFormComponent, canActivate: [RoleGuard], data: { privileges: ['ADMIN_ROLE'], titulo: 'Formulario de manteniimiineto de categorías'} },
          { path: 'notifications', component: NotificationsComponent, canActivate: [RoleGuard], data: { privileges: ['PUBLI_ROLE', 'ADMIN_ROLE'], titulo: 'Notificaciones web'}  },
          { path: 'notification/:id', component: NotificationFormComponent, canActivate: [RoleGuard], data: { privileges: ['PUBLI_ROLE', 'ADMIN_ROLE'], titulo: 'Formulario de notificaciones web'}  },
          { path: 'convocatories', component: ConvocatoryComponent, canActivate: [RoleGuard], data: { privileges: ['CONV_ROLE','ADMIN_ROLE'], titulo: 'Convocatorias web'}  },
          { path: 'convocatory/:id', component: ConvocatoryFormComponent, canActivate: [RoleGuard], data: { privileges: ['CONV_ROLE','ADMIN_ROLE'],titulo: 'Formulario de convocatorias web'}  },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

