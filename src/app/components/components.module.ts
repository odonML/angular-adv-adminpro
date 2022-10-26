import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncremetadorComponent } from './incremetador/incremetador.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DonaComponent } from './dona/dona.component';

@NgModule({
  declarations: [IncremetadorComponent, ProgressBarComponent, DonaComponent],
  exports: [IncremetadorComponent, ProgressBarComponent, DonaComponent],
  imports: [CommonModule, FormsModule],
})
export class ComponentsModule {}
