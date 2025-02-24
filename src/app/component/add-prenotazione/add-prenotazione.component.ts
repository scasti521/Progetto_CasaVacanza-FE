import {Component, Input, OnInit} from '@angular/core';
import {PrenotazioneService} from "../../service/prenotazione.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CasaVacanza} from "../../models/CasaVacanza";
import {Utente} from "../../models/Utente";
import {Prenotazione} from "../../models/Prenotazione";

@Component({
  selector: 'app-add-prenotazione',
  templateUrl: './add-prenotazione.component.html',
  styleUrls: ['./add-prenotazione.component.css']
})
export class AddPrenotazioneComponent implements OnInit{

  formPrenotazione: FormGroup;
  @Input() casaVacanza: CasaVacanza;
  @Input() utente: Utente;

  constructor(
    private prenotazioneService: PrenotazioneService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { casaVacanza: CasaVacanza, utente: Utente };
    this.casaVacanza = state.casaVacanza;
    this.utente = state.utente;
  }

  ngOnInit(): void {
    this.formPrenotazione = new FormGroup({
      casaVacanzaId: new FormControl(this.casaVacanza?.id, Validators.required),
      utenteId: new FormControl(this.utente?.id, Validators.required),
      dataInizio: new FormControl('', Validators.required),
      dataFine: new FormControl('', Validators.required),
      numeroPersone: new FormControl('', [Validators.required, this.maxPostiLettoValidator(this.casaVacanza.postiLetto)]),
    });
  }

  maxPostiLettoValidator(max: number) {
    return (control: FormControl) => {
      const value = control.value;
      return value > max ? { maxPostiLetto: { max } } : null;
    };
  }

  prenota(): void {
    if (this.formPrenotazione.valid) {
      const prenotazione: Prenotazione = this.formPrenotazione.value;
      console.log('Prenotazione:', prenotazione);
      this.prenotazioneService.creaPrenotazione(prenotazione).subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['/home']);
          }
        }
      );
    }

  }

}
