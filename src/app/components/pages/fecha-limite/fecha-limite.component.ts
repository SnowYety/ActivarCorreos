import { Component, OnInit } from '@angular/core';
import { ApiUcqService } from '../../../services/api-ucq.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fecha-limite',
  templateUrl: './fecha-limite.component.html',
  styleUrls: ['./fecha-limite.component.css']
})
export class FechaLimiteComponent implements OnInit {

  fechaLimite = new Date();
  dias = 1;
  editar=true;
  constructor(private apiService:ApiUcqService,private router:Router) { 
   
  }

  ngOnInit(): void {
      this.apiService.getFecha().subscribe(res =>{
        this.fechaLimite = res.FechaLimite;
        this.dias = res.dias;
      })
  }

  guardar(){
      this.apiService.updateFecha(this.fechaLimite,this.dias).subscribe(res => {
        if(res.flag){
          Swal.fire({
            title:res.message,
            icon:'success',
            position:'top'
          });

          this.editar = !this.editar;
        }else{
          if(res.message != 'ERROR al actualizar la informacion'){
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }else{
            Swal.fire({
              title:res.message,
              icon:'error',
              position:'top'
            });
  
            this.editar = !this.editar;
            this.apiService.getFecha().subscribe(res =>{
              this.fechaLimite = res.FechaLimite;
              this.dias = res.dias;
            });
          }
        }
      })
  }

}



