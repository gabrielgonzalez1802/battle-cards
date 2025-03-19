import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carta } from '../model/carta';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8099/api/cartas';

  crearCarta(carta: Carta): Observable<Carta> {
    return this.http.post<Carta>(this.apiUrl, carta).pipe(
      catchError(error => {
        console.error('Error al crear la carta:', error);
        return throwError(() => new Error('Error al crear la carta'));
      })
    );
  }

  actualizarCarta(id: number, carta: Carta): Observable<Carta> {
    return this.http.put<Carta>(`${this.apiUrl}/${id}`, carta).pipe(
      catchError(error => {
        console.error('Error al actualizar la carta:', error);
        return throwError(() => new Error('Error al actualizar la carta'));
      })
    );
  }

  obtenerCartas(): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener las cartas:', error);
        return throwError(() => new Error('Error al obtener las cartas'));
      })
    );
  }

  obtenerCartaPorId(id: number): Observable<Carta> {
    return this.http.get<Carta>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener la carta:', error);
        return throwError(() => new Error('Error al obtener la carta'));
      })
    );
  }

  eliminarCarta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar la carta:', error);
        return throwError(() => new Error('Error al eliminar la carta'));
      })
    );
  }
}