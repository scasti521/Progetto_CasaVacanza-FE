import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {UtenteService} from "./service/utente.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tutto In Casa';
  showNavbar: boolean = true;

  constructor(
    private router: Router,
    private utenteService: UtenteService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/login') && !event.url.includes('/add-utente');
      }
    });
  }

  ngOnInit(): void {
    //richiamo il metodo di autologin per verificare se il token è ancora valido o meno
    this.utenteService.autoLogin();
  }

}
