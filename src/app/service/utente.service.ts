import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Utente } from "../models/Utente";
import {BehaviorSubject, catchError, map, Observable, of, Subject, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private authState = new BehaviorSubject<boolean>(this.isTokenPresent());
  authState$ = this.authState.asObservable();

  private isTokenPresent(): boolean {
    return !!localStorage.getItem('token');
  }

  utenti: Utente[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  token: string;
  decodetoken: any;
  utenteSelected: Utente;

  utenteChanged = new Subject<void>();

  creaUtente(nuovoUtente: Utente): Observable<boolean> {
    console.log('Sending user data to backend:', nuovoUtente);
    return this.http.post<Utente>('http://localhost:8080/api/utente/crea', nuovoUtente).pipe(
      map(response => {
        console.log('User created successfully:', response);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error creating user:', err);
        return of(false);
      })
    );
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8080/api/utente/login', { username, password }, { observe: 'response' }).pipe(
      map(response => {
        this.token = response.headers.get('Authorization');
        console.log('Login successful:', response);
        localStorage.setItem('token', this.token);
        console.log('Token saved:', this.token);
        this.authState.next(true);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error logging in:', err);
        return of(false);
      })
    );
  }

  logout() {
      console.log('Logging out');
      this.token = null;
      this.decodetoken = null;
      localStorage.removeItem('token');
      this.authState.next(false);
      if (!localStorage.getItem('token')) {
      console.log('Token successfully removed from localStorage');
    } else {
      console.error('Failed to remove token from localStorage');
    }
    this.router.navigateByUrl('/login');
  }

  decodeToken() {
    if (this.token) {
      try {
        this.decodetoken = jwtDecode(this.token);
        console.log('Token decoded:', this.decodetoken);
        const role = this.decodetoken.ruolo;
        const id = this.decodetoken.id;
        console.log('Role:', role);
        console.log('ID:', id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('No token found');
    }
  }

  //verifica questo metodo?????
  eliminaUtente(id: number): Observable<boolean> {
    console.log('Deleting user with id:', id);
    return this.http.delete<boolean>(`http://localhost:8080/api/utente/delete/${id}`).pipe(
      switchMap(()=> {
        return this.http.get<Utente[]>('http://localhost:8080/api/utente/all');
      }),
      map(response => {
        this.utenti = response;
        this.utenteChanged.next();
        console.log('User deleted successfully:', response);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error deleting user:', err);
        return of(false);
      })
    );
  }

  getUtenti(): Observable<boolean> {
    return this.http.get<Utente[]>('http://localhost:8080/api/utente/all').pipe(
      map(utenti => {
        this.utenti = utenti;
        console.log('Utenti caricati con successo:', utenti);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error loading users:', err);
        return of(false);
      })
    );
  }

  modificaUtente(utente: Utente): Observable<boolean> {
    //const headers = this.getAuthHeaders();
    return this.http.post<Utente>('http://localhost:8080/api/utente/update', utente, /*{headers}*/).pipe(
      map(automobile => true),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(false);
      })
    )
  }

  //metodo di autologin, se il token è presente allora l'utente è già loggato
  autoLogin(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.decodeToken();
      this.authState.next(true);
      this.router.navigateByUrl('/home');
    }
  }

  //metodo per ottenere l'utente loggato
  getUtente(): Utente {
    return this.decodetoken;
  }

}
