import {Component, Input, OnInit} from '@angular/core';
import {Utente} from "../../models/Utente";
import {Router} from "@angular/router";
import {UtenteService} from "../../service/utente.service";

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  @Input() utente: Utente;

  constructor(
      private router: Router,
      private utenteService: UtenteService
  ) { }

  ngOnInit(): void {
      this.utente = this.utenteService.getUtente();
      console.log(this.utenteService.getUtente());
      console.log(this.utente.sub);
  }

  getRuolo(): string {

    console.log(this.utente);
    console.log(this.utente.ruolo);

    if(this.utente.ruolo == 'ROLE_ADMIN') {
      return 'ADMIN';
    }
    else{
      return 'UTENTE';
    }
  }

  logout():void{
    this.utenteService.logout();
  }

}
