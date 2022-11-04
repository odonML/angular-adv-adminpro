import { Usuario } from '../models/usuario.model';

export interface obtenerUsuarios {
  total: number;
  usuarios: Usuario[];
}
