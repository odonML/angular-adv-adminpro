import { environment } from 'src/environments/environment';

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public id?: string
  ) {}

  get ImgUserUrl() {
    if (!this.img?.includes('https')) {
      return `${environment.base_url}/upload/usuarios/${this.img}`;
    } else if (this.img?.includes('https')) {
      return this.img;
    } else {
      return `${environment.base_url}/upload/usuarios/no-imagen`;
    }
  }
}
