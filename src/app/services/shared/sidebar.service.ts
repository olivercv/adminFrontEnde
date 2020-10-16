import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        // { titulo: 'Progress', url: '/progress'},
        // { titulo: 'Gráficas', url: '/graficas1'},
        // { titulo: 'Promesas', url: '/promesas'},
        // { titulo: 'RxJs', url: '/rxjs'}
      ]
    },
    {
      titulo: 'Manteninimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/users', privileges: ['ADMIN_ROLE']},
        {titulo: 'Notificaciones', url: '/notifications', privileges: ['PUBLI_ROLE', 'ADMIN_ROLE']},
        {titulo: 'Publicaciones', url: '/publications', privileges: ['PUBLI_ROLE', 'ADMIN_ROLE']},
        {titulo: 'Categorías', url: '/categories', privileges: ['ADMIN_ROLE']},
        {titulo: 'Convocatorias', url: '/convocatories', privileges: ['CONV_ROLE', 'ADMIN_ROLE']}
      ]
    }
  ];
  constructor() { }
}
