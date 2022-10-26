import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  itemTheme = document.querySelector('#theme');
  defaultTheme = './assets/css/colors/default-dark.css';
  urlBase = './assets/css/colors/';

  constructor() {
    const url = localStorage.getItem('theme') || this.defaultTheme;
    this.itemTheme?.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `${this.urlBase}${theme}.css`;
    this.itemTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.selectedTheme();
  }

  selectedTheme() {
    const selectors = document.querySelectorAll('.selector');
    selectors.forEach((element: any) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `${this.urlBase}${btnTheme}.css`;
      const currentTheme = this.itemTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
