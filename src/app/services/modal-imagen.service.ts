import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;

  tipo: string = '';
  id?: string = '';
  img?: string = '';

  subirImagenNotification = new BehaviorSubject(false);

  constructor() {}

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'hospitales' | 'medicos',
    id?: string,
    img?: string
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
