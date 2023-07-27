import { Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private _ngxTranslateService: NgxTranslateService) { }

  // Función para cambiar el idioma de la aplicación
  setLanguage(lang: string): void {
    this._ngxTranslateService.use(lang);
  }

  // Función para obtener la traducción de una clave específica
  translate(key: string): string {
    return this._ngxTranslateService.instant(key);
  }
}
