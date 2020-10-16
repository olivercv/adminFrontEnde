import { Pipe, PipeTransform } from '@angular/core';

interface itemMenu {
  privileges: [];
  titulo: string;
  url: string;
}

@Pipe({
  name: 'menuFilter'
})
export class MenuPipe implements PipeTransform {

  transform(items: itemMenu[]) {

    let submenu = [];
    const user = JSON.parse(localStorage.getItem('user'));
    for ( let item of items) {
      if (item.privileges) {
      for (let priv of item.privileges) {
        if (priv === user.role) {
          submenu.push(item);
        }
      }
    } else {
      submenu.push(item);
    }
    }
    return submenu;
  }

}
