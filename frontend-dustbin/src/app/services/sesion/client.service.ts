import { Injectable } from '@angular/core';
import { API_URL } from '../../env';
import { catchError, Observable, retry, Subject, tap, throwError  } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModelS } from 'src/app/models/modelS.interface';
import { User } from 'src/app/models/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  API_URL = API_URL;
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


  editUser( token:string,user:Partial<User>): Observable<User> {
    const headers = new HttpHeaders({
     
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.put<User>(`${this.API_URL}/user/update/${user.id}`,user,{headers})
  }

  getAll(token:any): Observable<any> {
    const headers = new HttpHeaders({
     
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.all}`,{headers});
  }

  deleteCar( token:string,id:number): Observable<ModelS> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<ModelS>(`${this.API_URL}/model/delete/${id}`, { headers })
      .pipe(retry(3), catchError(this.handleError));
  }
}

