import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto/auto.mjs';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit, AfterViewInit {
  @Input() idChart: string = 'myChart';
  @Input() formatChart: string = 'doughnut';
  @Input() labelsChart: string[] = [];
  @Input() dataChart: number[] = [];
  @Input() colorsChart: string[] = [];
  @Input() tittleChart: string = 'Grafica';

  public chart: any;

  ngOnInit(): void {}

  ngAfterViewInit() {
    let id = this.idChart;
    let type = this.formatChart;
    let labels = this.labelsChart;
    let data = this.dataChart;
    let colors = this.colorsChart;
    let tittle = this.tittleChart;
    this.createChart(id, type, labels, data, colors, tittle);
  }

  createChart(
    id: string,
    type: any,
    labels: string[],
    data: number[],
    colors: string[],
    tittle: string
  ) {
    this.chart = new Chart(id, {
      type,
      data: {
        labels,
        datasets: [
          {
            label: tittle,
            data,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
