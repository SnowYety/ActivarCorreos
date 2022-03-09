import { CorreoModel } from './correo.model';
export class PersonaModel{
    matricula:string='';
    personId:string='';
    nombre:string= '';
    segundoNombre:string='';
    apellidoPaterno:string='';
    apellidoMaterno:string='';
    correos:CorreoModel[]=[];
    telefonos=[];
}