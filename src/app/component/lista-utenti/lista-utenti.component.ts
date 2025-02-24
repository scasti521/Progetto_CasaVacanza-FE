import { Component, OnInit, OnDestroy } from '@angular/core';
import {UtenteService} from "../../service/utente.service";
import {Utente} from "../../models/Utente";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lista-utenti',
  templateUrl: './lista-utenti.component.html',
  styleUrls: ['./lista-utenti.component.css']
})
export class ListaUtentiComponent implements OnInit, OnDestroy {

  utenti: Utente[] = [];
  utentiSub: Subscription;
  filteredUtenti: Utente[] = [];
  utentiChangedSub: Subscription;

  constructor(
    private utenteService: UtenteService,
  ) { }

  ngOnInit(): void {
    this.utenteService.getUtenti().subscribe(success => {
      if (success) {
        this.filteredUtenti=this.utenti = this.utenteService.utenti;
        console.log('Utenti caricati con successo');
      } else {
        console.log('Errore nel caricamento degli utenti');
      }
    });
    this.utentiChangedSub = this.utenteService.utenteChanged.subscribe({
      next: (esito) => {
        this.filteredUtenti = this.utenti = this.utenteService.utenti;
      }
    });
  }

  ngOnDestroy() {
    this.utentiSub?.unsubscribe();
  }

}
