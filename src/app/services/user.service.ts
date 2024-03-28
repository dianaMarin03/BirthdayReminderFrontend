import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../user';
//decoratorul injectable pentru a fi injectat și utilizat în alte componente.
@Injectable({
  providedIn: 'root'
})
//metode pentru a obține un utilizator în funcție de email și parolă și pentru 
//a adăuga un utilizator nou prin intermediul cererilor HTTP către un API extern.
export class UserService {

  private BaseUrl = "https://localhost:7256/Users/"
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }// Constructorul serviciului injectează HttpClient,
  // care va fi utilizat pentru a efectua cererile HTTP.

  getUserByEP(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(this.BaseUrl + 'getByEmailPass/' + email + '/' + password, this.httpOptions)
  }

  addUser(user:User):Observable<any>{
    return this.httpClient.post<User>(this.BaseUrl ,user, this.httpOptions)
  
  }
}
