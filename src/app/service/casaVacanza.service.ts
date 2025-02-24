import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, Observable, of, Subject, switchMap} from "rxjs";
import {CasaVacanza} from "../models/CasaVacanza";

@Injectable({
  providedIn: 'root'
})
export class CasaVacanzaService {

  caseVacanza: CasaVacanza[] = [];

  casaChanged = new Subject<void>();

  casaVacanzaSelected: CasaVacanza;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  creaCasaVacanza(nuovaCasaVacanza: CasaVacanza): Observable<boolean> {
    console.log('Sending house data to backend:', nuovaCasaVacanza);
    return this.http.post<CasaVacanza>('http://localhost:8080/api/casaVacanza/crea', nuovaCasaVacanza).pipe(
      map(response => {
        console.log('House created successfully:', response);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error creating house:', err);
        return of(false);
      })
    );
  }

  getCasaVacanza(): Observable<boolean> {
    return this.http.get<CasaVacanza[]>('http://localhost:8080/api/casaVacanza/all').pipe(
      map(caseVacanza => {
        this.caseVacanza = caseVacanza;
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error getting houses:', err);
        return of(false);
      })
    );
  }

  modificaCasaVacanza(casaVacanza: CasaVacanza): Observable<boolean> {
    return this.http.post<CasaVacanza>('http://localhost:8080/api/casaVacanza/update', casaVacanza).pipe(
      map(casaVacanza => true),
      catchError((err: HttpErrorResponse) => {
        console.error('Error updating house:', err);
        return of(false);
      })
    );
  }


  eliminaCasaVacanza(id: number): Observable<boolean> {
    return this.http.post<void>(`http://localhost:8080/api/casaVacanza/delete/${id}`, null).pipe(
      switchMap(() => {
        // Dopo l'eliminazione, aggiorna la lista locale
        return this.http.get<CasaVacanza[]>('http://localhost:8080/api/casaVacanza/all');
      }),
      map(caseVacanza => {
        // Aggiorna la lista locale e notifica il cambiamento
        this.caseVacanza = caseVacanza;
        this.casaChanged.next(); // Notifica i consumatori
        return true; // Ritorna successo
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Errore durante l\'eliminazione della casa:', err);
        return of(false); // Ritorna fallimento
      })
    );
  }

}
