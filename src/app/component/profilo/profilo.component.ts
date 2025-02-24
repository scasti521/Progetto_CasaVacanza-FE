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
  }

  getRuolo(): string {
    if(this.utente.ruolo == '0') {
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
