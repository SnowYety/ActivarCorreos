import { PersonaModel } from "./persona.model";

export class AlumnoModel {
    persona: PersonaModel = {
        matricula:'',
        personId:'',
        nombre: '',
        segundoNombre:'',
        apellidoPaterno:'',
        apellidoMaterno:'',
        correos:[],
        telefonos:[],
    };
    tutores: [] = [];
}