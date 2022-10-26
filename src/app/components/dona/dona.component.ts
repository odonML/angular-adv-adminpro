import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto/auto.mjs';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
