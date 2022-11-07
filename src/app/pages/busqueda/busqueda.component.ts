import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { obtenerGlobalBusqueda } from 'src/app/interfaces/obtenerGlobalBusqueda.interface';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  hospitales!: Hospital[];
  noExistHospitales: boolean = false;
  usuarios!: Usuario[];
  noExistUsuarios: boolean = false;
  medicos!: Medico[];
  noExistMedicos: boolean = false;

  constructor(
    private activateRouter: ActivatedRoute,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.activateRouter.params.subscribe(({ termino }) => {
      this.busquedaService
        .gobalSearch(termino)
        .subscribe((res: obtenerGlobalBusqueda) => {
          this.hospitales = res.hospitales;
          this.noExistHospitales = this.hospitales.length === 0;
          this.usuarios = res.usuarios;
          this.noExistUsuarios = this.usuarios.length === 0;
          this.medicos = res.medicos;
          this.noExistMedicos = this.medicos.length === 0;
        });
    });
  }
}
