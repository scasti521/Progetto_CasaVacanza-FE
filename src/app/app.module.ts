import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUtenteComponent } from './component/add-utente/add-utente.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './component/navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './component/login/login.component';
import { UtenteCardComponent } from './component/utente-card/utente-card.component';
import { ListaUtentiComponent } from './component/lista-utenti/lista-utenti.component';
import { HomeComponent } from './component/home/home.component';
import { ListaCaseComponent } from './component/lista-case/lista-case.component';
import { CasaCardComponent } from './component/casa-card/casa-card.component';
import { AddCasaComponent } from './component/add-casa/add-casa.component';
import { AddUtenteSmallComponent } from './component/add-utente-small/add-utente-small.component';
import {AuthInterceptor} from "./auth.interceptor";
import { PrenotazioneSingleComponent } from './component/prenotazione-single/prenotazione-single.component';
import { ListaPrenotazioniComponent } from './component/lista-prenotazioni/lista-prenotazioni.component';
import {PrenotazioneService} from "./service/prenotazione.service";
import { AddPrenotazioneComponent } from './component/add-prenotazione/add-prenotazione.component';
import { ProfiloComponent } from './component/profilo/profilo.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUtenteComponent,
    NavbarComponent,
    LoginComponent,
    UtenteCardComponent,
    ListaUtentiComponent,
    HomeComponent,
    ListaCaseComponent,
    CasaCardComponent,
    AddCasaComponent,
    AddUtenteSmallComponent,
    PrenotazioneSingleComponent,
    ListaPrenotazioniComponent,
    AddPrenotazioneComponent,
    ProfiloComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule

    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    PrenotazioneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
