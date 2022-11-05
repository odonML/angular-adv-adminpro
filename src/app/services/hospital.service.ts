import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { obtenerHospitales } from '../interfaces/obtenerHospitales.interface';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  obtenerHospitales(desde: number = 0) {
    return this.http
      .get<obtenerHospitales>(
        `${environment.base_url}/hospitales?desde=${desde}`,
        this.headers
      )
      .pipe(
        map((res) => {
          return {
            total: res.total,
            hospitales: res.hospitales,
          };
        })
      );
  }

  crearHospital(data: any) {
    return this.http.post(
      `${environment.base_url}/hospitales/`,
      data,
      this.headers
    );
  }

  guardarCambiosHospital(data: any) {
    return this.http.put(
      `${environment.base_url}/hospitales/${data.id}`,
      data,
      this.headers
    );
  }

  borrarHospital(id: string) {
    return this.http.delete(
      `${environment.base_url}/hospitales/${id}`,
      this.headers
    );
  }
}
