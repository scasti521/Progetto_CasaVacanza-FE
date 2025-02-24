import { Component } from '@angular/core';
import {UtenteService} from "../../service/utente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private utenteService: UtenteService,
    private router: Router,
  ) { }

  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 'admin';
  }

  get isLoggedIn(): boolean {
    return !!this.utenteService.token;
  }
sti
}
