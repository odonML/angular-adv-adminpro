import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  buscar(tipo: 'usuarios' | 'hospitales' | 'medicos', termino: string) {
    return this.http
      .get(
        `${environment.base_url}/todo/coleccion/${tipo}/${termino}`,
        this.headers
      )
      .pipe(
        map((res: any) => {
          const usuarios = res.resultado.map(
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
          return {
            total: res.total,
            usuarios,
          };
        })
      );
  }
}
