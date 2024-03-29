import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../env';
import { User } from '../../models/usuario.interface';
import { Login } from 'src/app/models/login.interface';
import { ModelS } from 'src/app/models/modelS.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _refresh$ = new Subject<void>();
  private registerUserUrl = API_URL + '/user';
  private loginUrl = API_URL + '/user/login';
  private getUserUrl = API_URL + '/user';
  private logoutUrl = API_URL + '/user/logout';
  private createModel = API_URL + '/model/create';
  private getModel = API_URL +'/modelSensors/getAll'
  private getSensor = API_URL + '/sensor/getAll'

  constructor(private http: HttpClient, private router: Router) { }
  get_refresh$() {
    return this._refresh$;
  }

  getRegister(user: User): Observable<User> {
    return this.http.post<User>(this.registerUserUrl, user)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
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


 login(login: Login): Observable<any> {
  return this.http.post(`${this.loginUrl}`, login)
    .pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          window.alert('Username or password incorrect.');
        } else {
          window.alert('An error occurred. Please try again later');
        }
        return throwError(error);
      })
    );
}
  

  logout() {
    localStorage.removeItem('token');
    this.http.post(`${this.logoutUrl}`, {});
    this.router.navigate(['/login']);
    
   

  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getuser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(`${this.getUserUrl}`, { headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }


 

  
}

