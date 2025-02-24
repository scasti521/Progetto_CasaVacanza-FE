import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtenteService } from '../../service/utente.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private utenteService: UtenteService,
    private router: Router
  ) { }

  FormLogin: FormGroup;
  loginSub: Subscription;
  showError: boolean = false;

  ngOnInit(): void {
    this.FormLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    const username = this.FormLogin.get('username').value;
    const password = this.FormLogin.get('password').value;

    this.loginSub = this.utenteService.login(username, password).subscribe({
      next: esito => {
        if (esito) {
          this.router.navigateByUrl('/home');
          this.utenteService.decodeToken();
        } else {
          this.showError = true;
        }
      }
    });
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
