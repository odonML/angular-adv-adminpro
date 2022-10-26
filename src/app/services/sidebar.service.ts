import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      tltle: 'Dashboard111',
      icon: 'mdi mdi-gauge',
      url: '/',
      subMenu: [
        {
          title: 'Principal',
          url: '/',
        },
        {
          title: 'Progress Bar',
          url: 'progress',
        },
        {
          title: 'Graphs',
          url: 'grafica1',
        },
        {
          title: 'Promises',
          url: 'promesas',
        },
        {
          title: 'Rxjs',
          url: 'rxjs',
        },
      ],
    },
  ];

  constructor() {}
}
