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
        { titulo: 'Dashboard', url: '/dashboard'}
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
        {titulo: 'Usuarios', url: '/users'},
        {titulo: 'Notificaciones', url: '/notifications'},
        {titulo: 'Publicaciones', url: '/publications'},
        {titulo: 'Categorías', url: '/categories'},
        {titulo: 'Convocatorias', url: '/convocatories'}
      ]
    }
  ];
  constructor() { }
}
