import {Component, OnDestroy, OnInit} from '@angular/core';
import {Prenotazione} from "../../models/Prenotazione";
import {Subject, Subscription} from "rxjs";
import {PrenotazioneService} from "../../service/prenotazione.service";
import {UtenteService} from "../../service/utente.service";

@Component({
  selector: 'app-lista-prenotazioni',
  templateUrl: './lista-prenotazioni.component.html',
  styleUrls: ['./lista-prenotazioni.component.css']
})
export class ListaPrenotazioniComponent implements OnInit, OnDestroy {

  prenotazioni : Prenotazione[] =[];
  prenotazioniSub: Subscription;
  filteredPrenotazioni: Prenotazione[] = [];
  prenotazioniChangedSub: Subscription;

  constructor(
    private utenteService: UtenteService,
    private prenotazioneService: PrenotazioneService
  ) {
  }

  ngOnInit(): void {
    this.prenotazioneService.getPrenotazioni().subscribe(success => {
      if (success) {
        this.filteredPrenotazioni= this.prenotazioni = this.prenotazioneService.prenotazioni;
        this.filterPrenotazioni();
        console.log('Prenotazioni caricate con successo');
        console.log(this.filteredPrenotazioni);
      } else {
        console.log('Errore nel caricamento delle prenotazioni');
      }
    });
    this.prenotazioniChangedSub = this.prenotazioneService.prenotazioniChanged.subscribe({
      next: (esito) => {
        this.filteredPrenotazioni = this.prenotazioni = this.prenotazioneService.prenotazioni;
        this.filterPrenotazioni()
      }
    });
  }

  ngOnDestroy() {
    this.prenotazioniSub?.unsubscribe();
    this.prenotazioniChangedSub?.unsubscribe();
  }

  private filterPrenotazioni(): void {
    const userRole = this.utenteService.decodetoken.ruolo;
    const userId = this.utenteService.decodetoken.id;
    console.log('User Role:', userRole);
    console.log('User ID:', userId);

    if (userRole === 1) {
      console.log('User is a normal user');
      // Se l'utente è un utente normale, filtra le prenotazioni per ID utente
      this.filteredPrenotazioni = this.prenotazioni.filter(p => p.utente.id === userId);
    } else {
      // Se l'utente è un admin, mostra tutte le prenotazioni
      this.filteredPrenotazioni = this.prenotazioni;
    }
    console.log('Filtered Prenotazioni:', this.filteredPrenotazioni);
  }

}
