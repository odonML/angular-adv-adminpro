import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { obtenerMedicos } from '../interfaces/obtenerMedicos.interface';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  obtenerMedicos(desde: number = 0) {
    return this.http
      .get<obtenerMedicos>(
        `${environment.base_url}/medicos?desde=${desde}`,
        this.headers
      )
      .pipe(
        map((res) => {
          return {
            total: res.total,
            medicos: res.medicos,
          };
        })
      );
  }

  crearMedico(data: any) {
    return this.http.post(
      `${environment.base_url}/medicos/`,
      data,
      this.headers
    );
  }

  guardarCambios(data: any) {
    return this.http.put(
      `${environment.base_url}/medicos/${data.id}`,
      data,
      this.headers
    );
  }

  borrarMedico(id: string) {
    return this.http.delete(
      `${environment.base_url}/medicos/${id}`,
      this.headers
    );
  }
}
