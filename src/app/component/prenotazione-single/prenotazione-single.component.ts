import {Component, Input} from '@angular/core';
import {CasaVacanzaService} from "../../service/casaVacanza.service";
import {Router} from "@angular/router";
import {UtenteService} from "../../service/utente.service";
import {Prenotazione} from "../../models/Prenotazione";
import {Subscription} from "rxjs";
import {PrenotazioneService} from "../../service/prenotazione.service";

@Component({
  selector: 'app-prenotazione-single',
  templateUrl: './prenotazione-single.component.html',
  styleUrls: ['./prenotazione-single.component.css']
})
export class PrenotazioneSingleComponent {

  @Input() prenotazione: Prenotazione;

  eliminaSub: Subscription;

  constructor(
    private utenteService: UtenteService,
    private prenotazioneService: PrenotazioneService
  ) { }

  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 0;
  }

  get isLoggedIn(): boolean {
    return !!this.utenteService.token;
  }

  elimina(){
    console.log(this.prenotazione);
    const esito = confirm('Sei sicuro di eliminare la prenotazione?');
    if(esito){
      if (this.prenotazione && this.prenotazione.id !== undefined) {
        console.log(this.prenotazione.id);
      } else {
        console.error('Prenotazione o ID non definito');
      }
      this.eliminaSub = this.prenotazioneService.eliminaPrenotazione(this.prenotazione.id).subscribe();
    }
  }

  get ruolo_utente(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 1;
  }

}
