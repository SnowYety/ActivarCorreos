import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TutoresComponent } from './components/pages/tutores/tutores.component';
import { ReportesComponent } from './components/pages/reportes/reportes.component';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { DataTablesModule } from 'angular-datatables';
import { AlumnoComponent } from './components/pages/alumno/alumno.component';
import { LoginComponent } from './components/login/login.component';
import { FechaLimiteComponent } from './components/pages/fecha-limite/fecha-limite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TutoresComponent,
    ReportesComponent,
    CapitalizadoPipe,
    AlumnoComponent,
    LoginComponent,
    FechaLimiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
