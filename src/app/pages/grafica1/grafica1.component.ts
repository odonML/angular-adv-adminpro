import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  //tabla uno
  idChartOne: string = 'ventas-chart';
  tittleChartOne: string = 'Ventas';
  labelsChartOne: string[] = ['Refresco', 'Huevo', 'Papas'];
  dataChartOne: number[] = [20, 10, 40];
  colorsChartOne: string[] = [
    'rgb(245, 183, 177)',
    'rgb(232, 218, 239)',
    'rgb(212, 230, 241)',
  ];
  //tabla dos
  idChartTwo: string = 'citas-chart';
  tittleChartTwo: string = 'Citas';
  labelsChartTwo: string[] = ['Refresco', 'Huevo', 'Papas'];
  dataChartTwo: number[] = [20, 10, 40];
  colorsChartTwo: string[] = [
    'rgb(245, 183, 177)',
    'rgb(232, 218, 239)',
    'rgb(212, 230, 241)',
  ];

  //tabla tres
  idChartThree: string = 'viajes-chart';
  tittleChartThree: string = 'Viajes';
  labelsChartThree: string[] = ['Refresco', 'Huevo', 'Papas'];
  dataChartThree: number[] = [20, 10, 40];
  colorsChartThree: string[] = [
    'rgb(245, 183, 177)',
    'rgb(232, 218, 239)',
    'rgb(212, 230, 241)',
  ];

  //tabla cuatro
  idChartFour: string = 'tiendas-chart';
  tittleChartFour: string = 'Tiendas';
  labelsChartFour: string[] = ['Refresco', 'Huevo', 'Papas'];
  dataChartFour: number[] = [20, 10, 40];
  colorsChartFour: string[] = [
    'rgb(245, 183, 177)',
    'rgb(232, 218, 239)',
    'rgb(212, 230, 241)',
  ];
}
