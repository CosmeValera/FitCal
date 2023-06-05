import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGoogleAuth } from 'src/app/pages/profile/model/GoogleAuth.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  createUser(obj: IGoogleAuth): Observable<HttpResponse<IGoogleAuth>> {
    return this.http.post<IGoogleAuth>(
      'http://localhost:8080/auth/google',
      obj,
      {
        observe: 'response',
      }
    );
  }
}
