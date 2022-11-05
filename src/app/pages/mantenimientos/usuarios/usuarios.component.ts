import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { obtenerUsuarios } from 'src/app/interfaces/obtenerUsuarios.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  desde: number = 0;

  cargando: boolean = true;

  imgSubs!: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImageService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();

    this.imgSubs = this.modalImageService.subirImagenNotification.subscribe(
      () => this.obtenerUsuarios()
    );
  }

  obtenerUsuarios() {
    this.cargando = true;
    this.usuarioService
      .obtenerUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.obtenerUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino === '') {
      this.obtenerUsuarios();
    } else {
      this.busquedaService.buscar('usuarios', termino).subscribe(
        (res) => {
          this.usuarios = res.resultados.map(
            (user: any) =>
              new Usuario(
                user.nombre,
                user.email,
                '',
                user.img,
                user.google,
                user.role
              )
          );
        },
        (err) => {
          this.usuarios = [];
          console.log('error', err);
        }
      );
    }
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.id === this.usuarioService.id) {
      return Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No puede eliminar su usuario',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    Swal.fire({
      title: 'Quieres eliminar este usuario?',
      text: 'Seguro!!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuario).subscribe((res: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.msj,
            showConfirmButton: false,
            timer: 1500,
          });
          this.obtenerUsuarios();
        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService
      .cambiarRoleUsuario(usuario)
      .subscribe((res) => console.log(res));
  }

  abrirModal(usuario: Usuario) {
    this.modalImageService.abrirModal('usuarios', usuario.id, usuario.img);
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
