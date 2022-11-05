import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncremetadorComponent } from './incremetador/incremetador.component';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    IncremetadorComponent,
    ProgressBarComponent,
    DonaComponent,
    ModalImagenComponent,
  ],
  exports: [
    IncremetadorComponent,
    ProgressBarComponent,
    DonaComponent,
    ModalImagenComponent,
  ],
  imports: [CommonModule, FormsModule, PipesModule],
})
export class ComponentsModule {}
