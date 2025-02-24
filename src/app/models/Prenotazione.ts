import {CasaVacanza} from "./CasaVacanza";
import {Utente} from "./Utente";

export interface Prenotazione {
    id: number;
    dataInizio: Date;
    dataFine: Date;
    prezzoTotale: number;
    numeroPersone: number;
    casaVacanza: CasaVacanza;
    utente: Utente;
}
