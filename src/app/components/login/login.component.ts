import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiUcqService } from '../../services/api-ucq.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user='';
  password='';

  constructor(private serviceApi:ApiUcqService,private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/alumnos']);
    }
  }
  longIn(forma: NgForm) {
    if(forma.valid){
      console.log(this.user,this.password);
      this.serviceApi.ingrear(this.user,this.password).subscribe(res =>{
        if(res.flag==false){
          Swal.fire({
            icon:'error',
            title:res.message,
            position:'top'
          })
        }else{
          this.serviceApi.guardarToken(res.token);
          this.router.navigate(['/alumnos']);
        }
      })

    }
  }

}
