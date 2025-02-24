import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddUtenteComponent} from "./component/add-utente/add-utente.component";
import {LoginComponent} from "./component/login/login.component";
import {ListaUtentiComponent} from "./component/lista-utenti/lista-utenti.component";
import {HomeComponent} from "./component/home/home.component";
import {AddCasaComponent} from "./component/add-casa/add-casa.component";
import {ListaPrenotazioniComponent} from "./component/lista-prenotazioni/lista-prenotazioni.component";
import {AddPrenotazioneComponent} from "./component/add-prenotazione/add-prenotazione.component";
import {ProfiloComponent} from "./component/profilo/profilo.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'add-utente', component: AddUtenteComponent },
  {path: 'login', component: LoginComponent},
  {path: 'lista-utenti', component: ListaUtentiComponent},
  {path: 'add-casa', component: AddCasaComponent},
  {path: 'lista-prenotazioni', component: ListaPrenotazioniComponent},
  {path: 'add-prenotazione', component: AddPrenotazioneComponent},
  {path: 'profilo', component: ProfiloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
