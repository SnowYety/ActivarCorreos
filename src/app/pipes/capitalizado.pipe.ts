import { Pipe, PipeTransform } from '@angular/core';
import { uniqueSort } from 'jquery';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {

  transform(value: string, todas: boolean = true): string {
    if (value != undefined || value != '' || value != null) {
   
      value = value.toLocaleLowerCase();

      let nombres = value.split(' ');

      nombres.forEach(nombre => {
        if (nombre == '' || nombre == null) {
          let index = nombres.indexOf(nombre)
          nombres.splice(index, 1);
        }
      })
  

      if(nombres.length !=0){
        if (todas) {
          nombres = nombres.map(nombre => {

         
            return nombre[0].toLocaleUpperCase() + nombre.substring(1);


          })
        }else{
          nombres[0] = nombres[0][0].toLocaleUpperCase() + nombres[0].substring(1);
        }
      }

     


      return nombres.join(' ');
    } else {

      return '';
    }

  }

}
