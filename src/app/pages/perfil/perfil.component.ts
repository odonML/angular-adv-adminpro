import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  subirImagen!: File;
  usuario: Usuario;
  imagenTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarUsuario(this.perfilForm.value).subscribe(
      (res: any) => {
        const { email, nombre } = res.usuario;
        this.usuario.email = email;
        this.usuario.nombre = nombre;
        Swal.fire({
          title: 'Actualizar!',
          text: 'Se actualizo la informacion con exito',
          icon: 'success',
        });
      },
      (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.error.msj,
          icon: 'error',
        });
      }
    );
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

  uploadImagen() {
    this.fileUploadService
      .actualizarFoto(this.subirImagen, 'usuarios', this.usuarioService.id)
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
          this.usuario.img = res.nombreArchivo;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
