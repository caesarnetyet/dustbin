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


  getAll(token:any): Observable<any> {
    const headers = new HttpHeaders({
     
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.all}`,{headers});
  }
}

