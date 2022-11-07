import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

export interface obtenerGlobalBusqueda {
  ok: boolean;
  usuarios: Usuario[];
  hospitales: Hospital[];
  medicos: Medico[];
}
