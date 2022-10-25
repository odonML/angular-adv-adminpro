import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent {
  @Input() progress: number = 0;
  @Input() barClass: string = 'bg-primary';

  get getPorcentaje() {
    return `${this.progress}%`;
  }
}
