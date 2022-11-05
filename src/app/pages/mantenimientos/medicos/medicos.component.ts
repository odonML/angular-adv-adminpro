import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  cargando: boolean = true;
  total: number = 0;
  medicos!: Medico[];
  hospitalesCat!: Hospital[];

  imgSubs!: Subscription;

  constructor(
    private modalImageService: ModalImagenService,
    private medicosServices: MedicosService,
    private busquedaService: BusquedasService,
    private hospitalServices: HospitalService
  ) {}

  ngOnInit(): void {
    this.obtenerMedicos();

    this.imgSubs = this.modalImageService.subirImagenNotification.subscribe(
      () => this.obtenerMedicos()
    );
  }

  obtenerMedicos() {
    this.medicosServices.obtenerMedicos().subscribe((res) => {
      console.log(res.medicos);
      this.cargando = false;
      this.medicos = res.medicos;
      this.total = res.total;
      this.initCatalogHospitals();
    });
  }
  async crearMedico() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'URL address',
      inputPlaceholder: 'Enter the URL',
      showCancelButton: true,
    });

    if (value!.trim().length > 0) {
      this.medicosServices.crearMedico({ nombre: value }).subscribe(() => {
        this.obtenerMedicos();
      });
    }
  }

  editarMedico(medico: Medico) {
    this.medicosServices.guardarCambios(medico).subscribe((res) => {
      this.obtenerMedicos();
    });
  }

  eliminarMedico(medico: Medico) {
    this.medicosServices.borrarMedico(medico.id!).subscribe((res) => {
      this.obtenerMedicos();
    });
  }

  cambiarHospital(data: any, medico: Medico) {
    medico.hospital = data.target.value;
    this.medicosServices.guardarCambios(medico).subscribe((res) => {
      this.obtenerMedicos();
    });
  }

  buscarMedicos(termino: string) {
    if (termino === '') {
      this.obtenerMedicos();
    } else {
      this.busquedaService.buscar('medicos', termino).subscribe(
        (res) => {
          this.medicos = res.resultados;
        },
        (err) => {
          this.medicos = [];
          console.log('error', err);
        }
      );
    }
  }

  initCatalogHospitals() {
    this.hospitalServices.obtenerHospitales().subscribe((res) => {
      this.hospitalesCat = res.hospitales;
    });
  }

  abrirModal(medicos: any) {
    this.modalImageService.abrirModal('medicos', medicos.id, medicos.img);
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
