import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Utente} from "../../models/Utente";
import {Observable, Subscription} from "rxjs";
import {UtenteService} from "../../service/utente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-utente',
  templateUrl: './add-utente.component.html',
  styleUrls: ['./add-utente.component.css']
})
export class AddUtenteComponent implements OnInit, OnDestroy {

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
      nome: new FormControl( this.utenteDaModificare ? this.utenteDaModificare.nome : '', [Validators.required]),
      cognome: new FormControl( this.utenteDaModificare ? this.utenteDaModificare.cognome : '', [Validators.required]),
      username: new FormControl( this.utenteDaModificare ? this.utenteDaModificare.username : '', [Validators.required]),
      password: new FormControl( this.utenteDaModificare ? this.utenteDaModificare.password : '', [Validators.required]),
    });
  }

  mergeUtente(): void{
    //prendo i data dal form, e creo un nuovo oggetto utente non contando l'id
    const nuovoUtente : Utente = this.FormUtente.value;
    //richiamo il metodo creaUtente del servizio utenteService passandogli il nuovo utente
    let call: Observable<boolean>;
    if(this.utenteDaModificare){
      call = this.utenteService.modificaUtente({...nuovoUtente, id: this.utenteDaModificare.id})
    } else {
      call = this.utenteService.creaUtente(nuovoUtente)
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

}
