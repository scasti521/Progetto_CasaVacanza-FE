import { Component, Input} from '@angular/core';
import {CasaVacanza} from "../../models/CasaVacanza";
import {Subscription} from "rxjs";
import {CasaVacanzaService} from "../../service/casaVacanza.service";
import {Router} from "@angular/router";
import * as bootstrap from 'bootstrap';
import {UtenteService} from "../../service/utente.service";

@Component({
  selector: 'app-casa-card',
  templateUrl: './casa-card.component.html',
  styleUrls: ['./casa-card.component.css']
})
export class CasaCardComponent {

  @Input() casa: CasaVacanza;

  eliminaSub: Subscription;

  constructor(
    private casaService: CasaVacanzaService,
    private utenteService : UtenteService,
    private router: Router,
  ) { }

  modificaCasaVacanza(): void {
    this.casaService.modificaCasaVacanza(this.casa).subscribe();
  }

  //sistemare questo metodo che non fuzniona?????'
  openModal(casaId:number): void {
    const casaModal = document.getElementById('casaModal' + casaId);
    console.log('Modal:', casaModal);
    if (casaModal) {
      const modal = new bootstrap.Modal(casaModal);
      modal.show()
    }
  }

  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 0;
  }

  get isLoggedIn(): boolean {
    return !!this.utenteService.token;
  }

  elimina(event: Event, id: number): void {
    console.log('ID ricevuto:', id);
    event.stopPropagation();
    const esito = confirm('Sei sicuro di eliminare la casa?');
    if (esito) {
      this.eliminaSub = this.casaService.eliminaCasaVacanza(id).subscribe();
    }

  }

  navigateToEdit(event: Event): void {
    event.stopPropagation();
    this.casaService.casaVacanzaSelected = this.casa;
    this.router.navigateByUrl('/add-casa');
  }

  prenota(event: Event, casaVacanza : CasaVacanza): void {
    event.stopPropagation();
    const utente = this.utenteService.decodetoken;
    this.router.navigateByUrl('/add-prenotazione', { state: { casaVacanza: casaVacanza, utente: utente } });
  }


}
