import {Component, Input} from '@angular/core';
import {Utente} from "../../models/Utente";
import {UtenteService} from "../../service/utente.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-utente-card',
  templateUrl: './utente-card.component.html',
  styleUrls: ['./utente-card.component.css']
})
export class UtenteCardComponent {

  @Input() utente: Utente;

  eliminaSub: Subscription;

  constructor(
    private utenteService: UtenteService,
    private router: Router,
  ) { }

  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    //console.log(this.utenteService.decodetoken.ruolo);
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 0;
  }

  elimina(): void {
    console.log(this.utente);
    const esito = confirm('Sei sicuro di eliminare l\' utente?');
    if(esito){
      if (this.utente && this.utente.id !== undefined) {
        console.log(this.utente.id);
      } else {
        console.error('Utente o ID non definito');
      }
      this.eliminaSub = this.utenteService.eliminaUtente(this.utente.id).subscribe();
    }
  }

  navigateToEdit(): void {
    this.utenteService.utenteSelected = this.utente;
    this.router.navigateByUrl('/add-utente');
  }

}
