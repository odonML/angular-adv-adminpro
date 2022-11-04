import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUsuario } from '../interfaces/loginForm.interface';
import { obtenerUsuarios } from '../interfaces/obtenerUsuarios.interface';
import { RegisterForm } from '../interfaces/registerForm.interfaces';
import { Usuario } from '../models/usuario.model';

declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token() {
    return localStorage.getItem('token') || '';
  }
  get id() {
    return this.usuario.id || '';
  }
  get role() {
    return this.usuario.role || '';
  }
  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    // google.accounts.id.remove("corre", () =>{
    // this.router.navigateByUrl('/login');
    // })
  }

  validarToken() {
    return this.http
      .get(`${environment.base_url}/login/renew`, this.headers)
      .pipe(
        map((res: any) => {
          console.log(res);
          const { nombre, img, email, google, role, id } = res.data;
          this.usuario = new Usuario(nombre, email, '', img, google, role, id);

          console.log(this.usuario);
          localStorage.setItem('token', res.token);
          return true;
        }),
        catchError((res) => of(false))
      );
  }

  //====================================================================
  //=========================== USUARIO ==================================
  //====================================================================

  crearUsuario(form: RegisterForm) {
    return this.http.post(`${environment.base_url}/usuarios`, form).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  actualizarUsuario(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.role,
    };
    return this.http.put(
      `${environment.base_url}/usuarios/${this.id}`,
      data,
      this.headers
    );
  }

  obtenerUsuarios(desde: number = 0) {
    return this.http
      .get<obtenerUsuarios>(
        `${environment.base_url}/usuarios?desde=${desde}`,
        this.headers
      )
      .pipe(
        map((res) => {
          const usuarios = res.usuarios.map(
            (user) =>
              new Usuario(
                user.nombre,
                user.email,
                '',
                user.img,
                user.google,
                user.role,
                user.id
              )
          );
          return {
            total: res.total,
            usuarios,
          };
        })
      );
  }

  borrarUsuario(usuario: Usuario) {
    return this.http.delete(
      `${environment.base_url}/usuarios/${usuario.id}`,
      this.headers
    );
  }

  cambiarRoleUsuario(usuario: Usuario) {
    return this.http.put(
      `${environment.base_url}/usuarios/${usuario.id}`,
      usuario,
      this.headers
    );
  }

  //====================================================================
  //=========================== LOGIN ==================================
  //====================================================================
  loginUsuario(form: LoginUsuario) {
    return this.http.post(`${environment.base_url}/login`, form).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  loginWithGoogle(token: string) {
    return this.http
      .post(`${environment.base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }
}
