import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(
    img?: string,
    tipo?: 'usuarios' | 'hospitales' | 'medicos'
  ): string {
    if (!img?.includes('https')) {
      return `${environment.base_url}/upload/${tipo}/${img}`;
    } else if (img?.includes('https')) {
      return img;
    } else {
      return `${environment.base_url}/upload/usuarios/no-imagen`;
    }
  }
}
