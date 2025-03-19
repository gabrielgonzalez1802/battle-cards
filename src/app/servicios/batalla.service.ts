import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Batalla } from '../model/batalla';
import { JugadoresBatalla } from '../componentes/batalla/jugadores-batalla';
import { Jugador } from '../model/jugador';

@Injectable({
  providedIn: 'root'
})
export class BatallaService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8099/api/batallas';

  crearBatalla(jugadorId: number): Observable<Batalla> {
    return this.http.post<Batalla>(this.apiUrl+"/iniciar/"+jugadorId, {}).pipe(
      catchError(error => {
        console.error('Error al iniciar la batalla:', error);
        return throwError(() => new Error('Error al iniciar la batalla'));
      })
    );
  }

  definirPrimerJugador(jugadores: JugadoresBatalla): Observable<Jugador> {
    const params = new HttpParams()
      .set('jugador1Id', jugadores.jugador1Id.toString())
      .set('jugador2Id', jugadores.jugador2Id.toString());
  
    return this.http.post<Jugador>(this.apiUrl + "/definirPrimerJugador", null, { params }).pipe(
      catchError(error => {
        console.error('Error al definir el primer jugador:', error);
        return throwError(() => new Error('Error al definir el primer jugador'));
      })
    );
  }
}