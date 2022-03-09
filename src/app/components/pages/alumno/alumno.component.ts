import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiUcqService } from '../../../services/api-ucq.service';
import { AlumnoModel } from '../../../models/alumno.model';
import { CorreoModel } from '../../../models/correo.model';
import Swal from 'sweetalert2';
import { PersonaModel } from '../../../models/persona.model';


@Component({
    selector: 'app-alumno',
    templateUrl: './alumno.component.html',
    styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

    matricula = '';
    alumno: AlumnoModel;
    correos: CorreoModel[] = [];

    tutores: PersonaModel[] = [];

    constructor(private router: ActivatedRoute, private serviceApi: ApiUcqService,private rou:Router) {
        this.alumno = new AlumnoModel();

        this.pantallaDeCarga('Obteniendo Datos.....');

        this.router.params.subscribe(params => {

            this.matricula = params['matricula'];
        });

       this.cargarDatos(true);
      
    }

    ngOnInit(): void {

    }

    cambiarStatus(correo: CorreoModel) {

        if (correo.status) {
            Swal.fire({
                icon: 'question',
                title: '¿Desea desactivar el correo: ' + correo.correo + '?',
                showCancelButton: true,
                confirmButtonText: '<i class="fa-solid fa-check"></i> Si',
                cancelButtonText: '<i class="fa-solid fa-xmark"></i> Cancelar',
                position: 'top'
            }).then(result => {
                if (result.isConfirmed) {
                    this.serviceApi.cambiarStatusCorreo(correo).subscribe(respuesta => {

                        this.pantallaDeCarga('Actualizando Datos.....');
                        
                        if (respuesta.flag) {
                            this.cargarDatos(false);
                          
                            Swal.fire({
                                icon: 'success',
                                title: respuesta.message,
                                allowOutsideClick: false,
                                position: 'top'
                            });

                        } else {
                            if(respuesta.message==='Error en el token'){
                                localStorage.removeItem('token');
                                this.rou.navigate(['/login'])
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: respuesta.message,
                                    allowOutsideClick: false,
                                    position: 'top'
                                });
                            }
                        }
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'question',
                title: '¿Desea activar el correo: ' + correo.correo + '?',
                showCancelButton: true,
                confirmButtonText: '<i class="fa-solid fa-check"></i> Si',
                cancelButtonText: '<i class="fa-solid fa-xmark"></i> Cancelar',
                position: 'top'
            }).then(result => {
                if (result.isConfirmed) {
                    this.serviceApi.cambiarStatusCorreo(correo).subscribe(respuesta => {

                        this.pantallaDeCarga('Actualizando Datos.....');
                        
                        if (respuesta.flag) {
                            this.cargarDatos(false);
                           
                            Swal.fire({
                                icon: 'success',
                                title: respuesta.message,
                                allowOutsideClick: false,
                                position: 'top'
                            });

                        } else {
                            if(respuesta.message==='Error en el token'){
                                localStorage.removeItem('token');
                                this.rou.navigate(['/login'])
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: respuesta.message,
                                    allowOutsideClick: false,
                                    position: 'top'
                                });
                            }
                        }
                    });
                }
            });
        }

    }

    pantallaDeCarga(text: string) {
        Swal.fire({
            title: text,
            text: 'Espere por favor',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            position: 'top'
        });

        Swal.showLoading();
    }

    cargarDatos(cerrar:boolean) {
        this.serviceApi.getAlumno(this.matricula).subscribe(alumno => {

            this.alumno = alumno;
            this.correos = alumno.persona.correos;

            this.tutores = alumno.tutores;
            if(cerrar){
                Swal.close();
            }
           

        })
    }

}
