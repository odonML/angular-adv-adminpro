import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncremetadorComponent } from './incremetador/incremetador.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [IncremetadorComponent, ProgressBarComponent],
  exports: [IncremetadorComponent, ProgressBarComponent],
  imports: [CommonModule, FormsModule],
})
export class ComponentsModule {}
