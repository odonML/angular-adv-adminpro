import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incremetador',
  templateUrl: './incremetador.component.html',
  styles: [],
})
export class IncremetadorComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() btnClass: string = 'btn-primary';
  @Input() valueIncrement: number = 5;
  @Output() newProgress = new EventEmitter<number>();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  chageValueProgress(valor: number) {
    if (this.progress >= 100 && valor >= 0) {
      this.progress = 100;
    } else if (this.progress <= 0 && valor < 0) {
      this.progress = 0;
    } else {
      this.progress = this.progress + valor;
    }
    this.newProgress.emit(this.progress);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.newProgress.emit(this.progress);
  }
}
