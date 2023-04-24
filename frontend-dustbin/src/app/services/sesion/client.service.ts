import { Injectable } from '@angular/core';
import { API_URL } from '../../env';
import { catchError, Observable, retry, Subject, tap, throwError  } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModelS } from 'src/app/models/modelS.interface';

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
    return this.http.delete<ModelS>(`${this.API_URL}/cars/${id}`, { headers })
      .pipe(retry(3), catchError(this.handleError));
  }
}

