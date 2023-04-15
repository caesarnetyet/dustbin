import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UserRegister } from 'src/shared/interfaces/requests.interface';
import { API_URL } from 'src/app/env';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  registerUser(request: any): Observable<UserRegister> {
    return this.http.post<UserRegister>(API_URL + "/user", request)
      .pipe(
        catchError(this.errorHandler.handleError<UserRegister>('register'))
      )
  }

}
