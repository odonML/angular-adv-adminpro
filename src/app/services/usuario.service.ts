import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUsuario } from '../interfaces/loginForm.interface';
import { RegisterForm } from '../interfaces/registerForm.interfaces';

declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    // google.accounts.id.remove("corre", () =>{
    // this.router.navigateByUrl('/login');
    // })
  }

  validarToken() {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${environment.base_url}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        }),
        map((res) => true),
        catchError((res) => of(false))
      );
  }

  crearUsuario(form: RegisterForm) {
    return this.http.post(`${environment.base_url}/usuarios`, form).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

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
