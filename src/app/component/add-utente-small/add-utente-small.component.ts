import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtenteService} from "../../service/utente.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Utente} from "../../models/Utente";

@Component({
  selector: 'app-add-utente-small',
  templateUrl: './add-utente-small.component.html',
  styleUrls: ['./add-utente-small.component.css']
})
export class AddUtenteSmallComponent implements OnInit, OnDestroy {

  constructor(
    private utenteService: UtenteService,
    private router: Router
  ) { }

  FormUtente: FormGroup;

  salvaSub: Subscription;
  utenteDaModificare: Utente;

  ngOnInit(): void {
    this.utenteDaModificare = this.utenteService.utenteSelected
    this.FormUtente = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  mergeUtente(): void{
    //prendo i data dal form, e creo un nuovo oggetto utente non contando l'id
    const nuovoUtente : Utente = this.FormUtente.value;
    //richiamo il metodo creaUtente del servizio utenteService passandogli il nuovo utente
    let call: Observable<boolean>;
    call = this.utenteService.creaUtente(nuovoUtente)
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

}
