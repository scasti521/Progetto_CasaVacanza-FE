import { Component } from '@angular/core';
import {UtenteService} from "../../service/utente.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private utenteService: UtenteService
  ) {
  }

  get isLoggedIn(): boolean {
    return !!this.utenteService.token;
  }

  get ruolo(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 0;
  }

  get ruolo_utente(): boolean {
    // Logica per determinare il ruolo dell'utente
    return this.utenteService.decodetoken && this.utenteService.decodetoken.ruolo === 1;
  }

  logout():void{
    this.utenteService.logout();
  }

}
