import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { obtenerGlobalBusqueda } from '../interfaces/obtenerGlobalBusqueda.interface';
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
          return {
            total: res.total,
            resultados: res.resultado,
          };
        })
      );
  }

  gobalSearch(termino: string) {
    return this.http.get<obtenerGlobalBusqueda>(
      `${environment.base_url}/todo/${termino}`,
      this.headers
    );
  }
}
