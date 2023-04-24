import { Injectable } from '@angular/core';
import { ModelS } from 'src/app/models/modelS.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/env';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private _refresh$ = new Subject<void>();
  private createModel = API_URL + '/model/create';
  private getModel = API_URL +'/modelSensors/getAll';
  private getSensor = API_URL + '/sensor/getAll';
  

  constructor(private http: HttpClient, private router: Router) { }


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
  get_refresh$() {
    return this._refresh$;
  }
  createModelSensor(data: any, token: any) {
    const headers = new HttpHeaders({
     
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ModelS>(`${this.createModel}`, data, { headers })

  }

  getModelSensor(token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.getModel}`, { headers });
  }

  getSensors(token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.getSensor}`, { headers });
  }
  
  update(id:number,sensor:any ,token:any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,

    });
    return this.http.put<any>( `${API_URL}/sensor/update/${id}`, sensor, { headers })
      .pipe(catchError(this.handleError))
      .pipe(tap(() => {
        this._refresh$.next();
      }));
  }
  
}
