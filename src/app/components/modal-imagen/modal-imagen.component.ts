import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  subirImagen!: File;
  imagenTemp: any = null;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
  }

  uploadImagen() {
    this.fileUploadService
      .actualizarFoto(this.subirImagen, 'usuarios', this.modalImagenService.id!)
      .then((res: any) => {
        console.log(res);
        if (!res.ok) {
          Swal.fire({
            title: 'Error!',
            text: res.msj,
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Guardado!',
            text: 'Se actualizo la imagen',
            icon: 'success',
          });
          this.modalImagenService.subirImagenNotification.next(true);

          this.cerrarModal();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cambiarImagen(event: any) {
    const imagen = event!.target!.files[0];
    this.subirImagen = imagen;

    if (!imagen) {
      this.imagenTemp = null;
    } else {
      const render = new FileReader();

      render.readAsDataURL(imagen);
      render.onloadend = () => {
        this.imagenTemp = render.result;
      };
    }
  }
}
