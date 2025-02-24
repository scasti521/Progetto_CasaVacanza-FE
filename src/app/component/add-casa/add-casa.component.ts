import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CasaVacanza} from "../../models/CasaVacanza";
import {Observable, Subscription} from "rxjs";
import {CasaVacanzaService} from "../../service/casaVacanza.service";
import {Router} from "@angular/router";
import {UtenteService} from "../../service/utente.service";

@Component({
  selector: 'app-add-casa',
  templateUrl: './add-casa.component.html',
  styleUrls: ['./add-casa.component.css']
})
export class AddCasaComponent implements OnInit, OnDestroy{

  constructor(
    private casaVacanzaService: CasaVacanzaService,
    private utenteService: UtenteService,
    private router: Router
  ) { }
  FormCasa: FormGroup;
  salvaSub: Subscription;
  casaDaModificare: CasaVacanza;

  ngOnInit(): void {
    this.casaDaModificare = this.casaVacanzaService.casaVacanzaSelected;
    //inizializzo il form
    this.FormCasa = new FormGroup({
      nome: new FormControl(this.casaDaModificare ? this.casaDaModificare.nome : '', [Validators.required]),
      indirizzo: new FormControl(this.casaDaModificare ? this.casaDaModificare.indirizzo : '', [Validators.required]),
      prezzo: new FormControl(this.casaDaModificare ? this.casaDaModificare.prezzo : '', [Validators.required]),
      postiLetto: new FormControl(this.casaDaModificare ? this.casaDaModificare.postiLetto : '', [Validators.required]),
      citta: new FormControl(this.casaDaModificare ? this.casaDaModificare.citta : '', [Validators.required]),
      disponibilita: new FormControl(this.casaDaModificare ? this.casaDaModificare.disponibile : '', [Validators.required]),
      regione: new FormControl(this.casaDaModificare ? this.casaDaModificare.regione : '', [Validators.required]),
      immagine: new FormControl(this.casaDaModificare ? this.casaDaModificare.immagine : '', [Validators.required]),
      descrizione: new FormControl(this.casaDaModificare ? this.casaDaModificare.descrizione : '', [Validators.required]),
    });
  }

  mergeCasa(): void{
    //prendo i data dal form, e creo un nuovo oggetto casa non contando l'id
    const nuovaCasa : CasaVacanza = this.FormCasa.value;
    //richiamo il metodo creaCasa del servizio casaVacanza
    let call: Observable<boolean>;
    if (this.casaDaModificare) {
      call = this.casaVacanzaService.modificaCasaVacanza({...nuovaCasa, id: this.casaDaModificare.id})
    }else{
      call = this.casaVacanzaService.creaCasaVacanza(nuovaCasa)
    }
    this.salvaSub = call.subscribe({
      next: (esito) => {
        if(esito){
          this.router.navigateByUrl('/home')
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.salvaSub) {
      this.salvaSub.unsubscribe();
      this.utenteService.utenteSelected = null;
    }
  }

  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 0;
  }

  get isLoggedIn(): boolean {
    return !!this.utenteService.token;
  }

}
