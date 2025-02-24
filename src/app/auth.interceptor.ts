import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UtenteService} from "./service/utente.service";

// All'interno della richiesta ha bisogno di un autenticazione/privilegio
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private utenteService: UtenteService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes('login') || request.url.includes('all')){
      return next.handle(request);
    } else {
      const copy = request.clone({
        headers: new HttpHeaders({Authorization: 'Bearer ' + this.utenteService.token})
      })
      return next.handle(copy)
    }
  }
}
