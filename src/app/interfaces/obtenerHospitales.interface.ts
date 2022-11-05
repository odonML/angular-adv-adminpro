import { Hospital } from '../models/hospital.model';

export interface obtenerHospitales {
  total: number;
  hospitales: Hospital[];
}
