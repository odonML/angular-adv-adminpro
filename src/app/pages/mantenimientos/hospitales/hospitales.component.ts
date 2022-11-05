import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  cargando: boolean = true;
  total: number = 0;
  hospitales!: Hospital[];

  imgSubs!: Subscription;

  constructor(
    private hospitalesServices: HospitalService,
    private modalImageService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.obtenerHospitales();

    this.imgSubs = this.modalImageService.subirImagenNotification.subscribe(
      () => this.obtenerHospitales()
    );
  }

  buscarHospital(termino: string) {
    if (termino === '') {
      this.obtenerHospitales();
    } else {
      this.busquedaService.buscar('hospitales', termino).subscribe(
        (res) => {
          this.hospitales = res.resultados;
        },
        (err) => {
          this.hospitales = [];
          console.log('error', err);
        }
      );
    }
  }

  obtenerHospitales() {
    this.hospitalesServices.obtenerHospitales().subscribe((res) => {
      this.cargando = false;
      this.hospitales = res.hospitales;
      this.total = res.total;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalesServices
      .guardarCambiosHospital(hospital)
      .subscribe((res) => {
        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se guardaron los cambios',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  async crearHospital() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'URL address',
      inputPlaceholder: 'Enter the URL',
      showCancelButton: true,
    });

    if (value!.trim().length > 0) {
      this.hospitalesServices.crearHospital({ nombre: value }).subscribe(() => {
        this.obtenerHospitales();
      });
    }
  }

  borrarHospital(hospital: Hospital) {
    this.hospitalesServices.borrarHospital(hospital.id!).subscribe((res) => {
      this.obtenerHospitales();
      return Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Hospital Eliminado',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  abrirModal(hospitales: Hospital) {
    this.modalImageService.abrirModal(
      'hospitales',
      hospitales.id,
      hospitales.img
    );
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
