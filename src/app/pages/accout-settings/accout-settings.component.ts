import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';



@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(theme: string, link: any) {
    // console.log(link);
    this.aplicarCheck(link);
    this._ajustes.aplicarTema( theme );

  }

  aplicarCheck(link: any) {
    let selectores:any = document.getElementsByClassName('selector');
    // console.log(selectores);
    for ( let ref of selectores) {
      ref.classList.remove('working');

    }
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores:any = document.getElementsByClassName('selector');

      let tema = this._ajustes.ajustes.tema;

      for ( let ref of selectores) {
        if( ref.getAttribute('data-theme') === tema ) {
          ref.classList.add('working');
          break;
        }
      }

    }

}
