import { Component, OnInit } from '@angular/core';
import { ApiUcqService } from '../../../services/api-ucq.service';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent implements OnInit {

  anios: any[] = [];
  periodos: any[] = [];
  sessiones: any[] = [];

  alumnos: any[] = [];



  anio: string = 'Seleccione un año';
  periodo = 'Seleccione un periodo';
  session = '';

  habilitar: boolean = false;

  constructor(private serviceApi: ApiUcqService, private router: Router) {

    if (localStorage.getItem('anio') && localStorage.getItem('periodo')) {

      this.anio = localStorage.getItem('anio')!;
      this.periodo = localStorage.getItem('periodo')!;
      this.session = localStorage.getItem('session')!;

      Swal.fire({
        title: 'Cargando Datos.....',
        text: 'Espere por favor',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        position: 'top'
      });

      this.serviceApi.getAlumnos(this.anio, this.periodo, this.session).subscribe(res => {
        this.alumnos = res;
        if (res.flag === false) {
          Swal.close();
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        Swal.close();


      });

    } else {
      this.serviceApi.getAnioActivos().subscribe(aniosActivos => {
        this.anios = aniosActivos;
        this.anios.unshift({
          anio: 'Seleccione un año'
        });

      });
    }

  }

  ngOnInit(): void {
   
  }

  getPeriodo() {

    this.periodo = 'Seleccione un periodo';
    this.habilitarBotton();
    this.serviceApi.getPeriodosActivos(this.anio).subscribe(periodos => {
      this.periodos = periodos;

      this.periodos.unshift({
        periodo: 'Seleccione un periodo'
      })

    })
  }

  getSession() {
    this.session = '';
    this.habilitarBotton();
    this.serviceApi.getSessionesActivas(this.anio, this.periodo).subscribe(sessiones => {
      this.sessiones = sessiones;


      this.sessiones.unshift({
        IdSession: '',
        session: 'Seleccione una session'
      })
    })
  }

  habilitarBotton() {
    if (this.anio != 'Seleccione un año' && this.periodo != 'Seleccione un periodo') {
      this.habilitar = true;
    } else {
      this.habilitar = false;
    }
  }

  getTutores(forma: NgForm) {

    this.guardarDatos();

    Swal.fire({
      title: 'Obteniendo Datos.....',
      text: 'Espere por favor',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      position: 'top'
    });

    Swal.showLoading();

    this.serviceApi.getAlumnos(this.anio, this.periodo, this.session).subscribe(res => {
      if (res.flag === false) {
        Swal.close();
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
      this.alumnos = res;
      Swal.close();
      if (this.alumnos.length == 0) {
        this.eliminarDatos();
        Swal.fire({
          title: 'No se encontraron Datos',
          icon: 'warning',
          position: 'top'
        });
      }

    });
  }

  getAlumno(matricula: string) {

    this.router.navigate(['/alumno', matricula]);

  }

  guardarDatos() {
    localStorage.setItem('anio', this.anio);
    localStorage.setItem('periodo', this.periodo);
    localStorage.setItem('session', this.session);
  }

  eliminarDatos() {
    localStorage.removeItem('anio');
    localStorage.removeItem('periodo');
    localStorage.removeItem('session');

    this.alumnos = [];

    this.anio = 'Seleccione un año';
    this.periodo = 'Seleccione un periodo';
    this.session = '';

    this.serviceApi.getAnioActivos().subscribe(aniosActivos => {
      this.anios = aniosActivos;
      this.anios.unshift({
        anio: 'Seleccione un año'
      });

    });

  }


}
