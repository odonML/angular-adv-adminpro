import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${environment.base_url}/upload/${tipo}/${id}`;
      const fonrmData = new FormData();
      fonrmData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: fonrmData,
      });

      let data = await resp.json();

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
