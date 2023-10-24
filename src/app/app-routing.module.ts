import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaFormPeritajeComponent } from './components/busqueda-form-peritaje/busqueda-form-peritaje.component';
import { ElementosFormPeritajeComponent } from './components/elementos-form-peritaje/elementos-form-peritaje.component';
import { FormatoPeritajeComponent } from './components/formato-peritaje/formato-peritaje.component';
import { MenuComponent } from './components/menu/menu.component';
import { ParametrizacionFormPeritrajeComponent } from './components/parametrizacion-form-peritaje/parametrizacion-form-peritaje.component';
import { PartesFormPeritajeComponent } from './components/partes-form-peritaje/partes-form-peritaje.component';
import { HomePeritajeComponent } from './components/home-peritaje/home-peritaje.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-peritaje', pathMatch: 'full' },
  { path: 'home-peritaje', component: HomePeritajeComponent },
  { path: 'main/:headlightSpecString?', component: MenuComponent },
  { path: 'formato-peritaje', component: BusquedaFormPeritajeComponent },
  { path: 'formato-peritaje/parametrizacion', component: ParametrizacionFormPeritrajeComponent },
  { path: 'formato-peritaje/encabezados', component: FormatoPeritajeComponent },
  { path: 'formato-peritaje/listaPartes', component: PartesFormPeritajeComponent },
  { path: 'formato-peritaje/listaElementos', component: ElementosFormPeritajeComponent },
  { path: '**', redirectTo: 'home-peritaje'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
