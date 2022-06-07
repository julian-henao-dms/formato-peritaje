import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MenuComponent } from './components/menu/menu.component';
import { BusquedaFormPeritajeComponent } from './components/busqueda-form-peritaje/busqueda-form-peritaje.component';
import { FormatoPeritajeComponent } from './components/formato-peritaje/formato-peritaje.component';
import { PartesFormPeritajeComponent } from './components/partes-form-peritaje/partes-form-peritaje.component';
import { ElementosFormPeritajeComponent } from './components/elementos-form-peritaje/elementos-form-peritaje.component';

import { HeaderComponent } from './templates/header/header.component';
import { ModalFirmaComponent } from './templates/modal-firma/modal-firma.component';
import { ModalEditComponent } from './templates/modal-edit/modal-edit.component';
import { ParametrizacionFormPeritrajeComponent } from './components/parametrizacion-form-peritaje/parametrizacion-form-peritaje.component';

@NgModule({
  declarations: [
    AppComponent,
    FormatoPeritajeComponent,
    HeaderComponent,
    ModalFirmaComponent,
    ModalEditComponent,
    BusquedaFormPeritajeComponent,
    MenuComponent,
    PartesFormPeritajeComponent,
    ElementosFormPeritajeComponent,
    ParametrizacionFormPeritrajeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,  
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
