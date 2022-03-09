import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './components/pages/alumno/alumno.component';
import { ReportesComponent } from './components/pages/reportes/reportes.component';
import { TutoresComponent } from './components/pages/tutores/tutores.component';
import {LoginComponent} from './components/login/login.component'
import { AuthGuard } from './guards/auth.guard';
import { FechaLimiteComponent } from './components/pages/fecha-limite/fecha-limite.component';



const routes: Routes = [

  {path:'alumnos',component:TutoresComponent,canActivate:[AuthGuard]},
  {path:'reportes',component:ReportesComponent,canActivate:[AuthGuard]},
  {path:'alumno/:matricula',component:AlumnoComponent,canActivate:[AuthGuard]},
  {path:'fechaLimite',component:FechaLimiteComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'**',pathMatch:'full',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
