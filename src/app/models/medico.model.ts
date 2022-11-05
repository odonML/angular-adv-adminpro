export class Medico {
  constructor(
    public nombre: string,
    public id?: string,
    public img?: string,
    public usuario?: _Usuario,
    public hospital?: _Hospital
  ) {}
}
interface _Usuario {
  _id?: string;
  nombre: string;
}

interface _Hospital {
  _id?: string;
  nombre: string;
}
