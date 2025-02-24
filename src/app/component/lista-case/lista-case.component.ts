import { Component, OnInit, OnDestroy } from '@angular/core';
import { CasaVacanzaService } from "../../service/casaVacanza.service";
import { Subscription } from "rxjs";
import {CasaVacanza} from "../../models/CasaVacanza";
import {UtenteService} from "../../service/utente.service";

@Component({
  selector: 'app-lista-case',
  templateUrl: './lista-case.component.html',
  styleUrls: ['./lista-case.component.css']
})
export class ListaCaseComponent implements OnInit, OnDestroy {

  case: CasaVacanza[] = [];
  filteredCasa: CasaVacanza[] = [];
  caseSub: Subscription;
  casaChangedSub: Subscription;

  constructor(
    private casaVacanzaService: CasaVacanzaService,
    private utenteService: UtenteService
  ) { }

  ngOnInit(): void {
    this.casaVacanzaService.getCasaVacanza().subscribe(success => {
      if (success) {
        this.filteredCasa =this.case =this.casaVacanzaService.caseVacanza;
        console.log('Case caricate con successo');
      } else {
        console.log('Errore nel caricamento delle case');
      }
    });
    this.casaChangedSub = this.casaVacanzaService.casaChanged.subscribe({
      next: (esito) => {
        this.filteredCasa = this.case = this.casaVacanzaService.caseVacanza;
      }
    });
  }
  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 0;
  }

  get isLoggedIn(): boolean {
    return !!this.utenteService.token;
  }


  ngOnDestroy() {
    this.caseSub?.unsubscribe();
  }

}
