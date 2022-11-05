export class Hospital {
  constructor(
    public nombre: string,
    public id?: string,
    public img?: string,
    public usuario?: _Usuario
  ) {}
}

interface _Usuario {
  id?: string;
  nombre: string;
}
