import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, Subject, switchMap} from "rxjs";
import {Prenotazione} from "../models/Prenotazione";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  constructor(
    private http: HttpClient
  ) { }

  prenotazioni: Prenotazione[] = [];
  prenotazioniChanged = new Subject<void>();


  getPrenotazioni(): Observable<boolean> {
    const token = localStorage.getItem("token");
    console.log(token + " DIO CANE")// Oppure recuperalo da localStorage o AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Prenotazione[]>('http://localhost:8080/api/prenotazione/all', { headers })
      .pipe(
        map(prenotazioni => {
          this.prenotazioni = prenotazioni;
          console.log('Utenti caricati con successo:', prenotazioni);
          return true;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Errore nel caricamento delle prenotazioni:', err);
          return of(false);
        })
      );
  }

  creaPrenotazione(nuovaPrenotazione: Prenotazione): Observable<boolean> {
    console.log('Sending prenotazione data to backend:', nuovaPrenotazione);
    return this.http.post<Prenotazione>('http://localhost:8080/api/prenotazione/crea', nuovaPrenotazione).pipe(
      map(response => {
        console.log('Prenotazione creata con successo:', response);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Errore nella creazione della prenotazione:', err);
        return of(false);
      })
    );
  }

  eliminaPrenotazione(id: number): Observable<boolean> {
    console.log('Deleting prenotazione:', id);
    return this.http.delete<boolean>(`http://localhost:8080/api/prenotazione/delete/${id}`).pipe(
      switchMap(() => {
        return this.http.get<Prenotazione[]>('http://localhost:8080/api/prenotazione/all');
      }),
      map(response => {
        this.prenotazioni = response;
        this.prenotazioniChanged.next();
        console.log('Prenotazione eliminata con successo:', response);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Errore nell\'eliminazione della prenotazione:', err);
        return of(false);
      })
    );
  }
}
