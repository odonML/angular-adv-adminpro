import { Medico } from '../models/medico.model';

export interface obtenerMedicos {
  total: number;
  medicos: Medico[];
}
