import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlumnoModel } from '../models/alumno.model';
import {map} from 'rxjs/operators';
import { CorreoModel } from '../models/correo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiUcqService {

  url='http://localhost:3005/apiUcq/';

  constructor(private http:HttpClient) { }

  getAnioActivos(){
    return this.http.get<any[]>(this.url+'aniosActivos');
  }

  getPeriodosActivos(anio:string){
    return this.http.get<any[]>(this.url+'periodosActivos/'+anio);
  }

  getSessionesActivas(anio:string,periodo:string){
    return this.http.get<any[]>(this.url+'sessionActivas/'+anio+'/'+periodo);
  }

  getAlumnos(anio:string,periodo:string,session:string){
    return this.http.post<any>(this.url+'getAlumnos',{
      anio,
      periodo,
      session,
      token:localStorage.getItem('token')
    });
  }

  getAlumno(matricula:string){
    return this.http.get<AlumnoModel>(this.url+'getAlumno/'+matricula).pipe(map(respuesta=>{
      return respuesta;
    }));
  }

  cambiarStatusCorreo(correo:CorreoModel){
    return this.http.put<any>(this.url+'cambiarStatusCorreo',{
      id:correo.id,
      correo:correo.correo,
      status:correo.status,
      token:localStorage.getItem('token')
    });
  }

  ingrear(usuario:string,password:string){
    return this.http.post<any>(this.url+'singIn',{
      "user":usuario,
      "password":password
    })
  }

  guardarToken(token:string){
    localStorage.setItem('token',token);
  }

  getFecha(){
    return this.http.get<any>(this.url+'getFecha');
  }

  updateFecha(fecha:Date,dias:Number){
    return this.http.put<any>(this.url+'updateFecha',{
      fechaLimite:fecha,
      dias:dias,
      token:localStorage.getItem('token')
    }
    )
  }
}
