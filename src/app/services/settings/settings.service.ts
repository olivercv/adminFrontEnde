import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    // console.log('Guardado en local storage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes) );
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Cargando del localStorage');
      this.aplicarTema(this.ajustes.tema);

    } else {
      // console.log('Cargando valores por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema( theme: string) {
    const url = `assets/css/colors/${ theme }.css`;
    this.document.getElementById('theme').setAttribute('href', url);
    this.ajustes.tema = theme;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
