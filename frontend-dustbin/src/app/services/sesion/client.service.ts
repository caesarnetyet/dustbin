import { Injectable } from '@angular/core';
import { API_URL } from '../../env';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private _refresh$ = new Subject<void>();
  private all = API_URL + '/user/getAll';

  constructor(private http: HttpClient, private router: Router) { }
  get_refresh$() {
    return this._refresh$;
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error); // Agregado para imprimir el error en la consola
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del servidor
      console.error(
        `El servidor retornó el código ${error.status}, ` +
        `el error retornado fue: ${error.error.message}`);
    }
    // Devuelve un observable con un mensaje de error
    return throwError('Algo salió mal; por favor inténtelo de nuevo más tarde.');
  }

  getAll(token:any): Observable<any> {
    const headers = new HttpHeaders({
     
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.all}`,{headers});
  }
}

