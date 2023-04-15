import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UserRegister } from 'src/shared/interfaces/requests.interface';
import { API_URL } from 'src/app/env';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  registerUser(request: any): Observable<UserRegister> {
    return this.http.post<UserRegister>(API_URL + "/user", request)
      .pipe(
        catchError(this.handleError<UserRegister>('register'))
      )
  }

}
