import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, LoginUserModel } from 'src/app/Models/LoginUserModel';
import { RetornarUserPorUsernameViewModel, UserModel } from 'src/app/Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public Login(user : LoginUserModel): Observable<LoginResponse>  {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Usuario/login`, user);
  }

  public RecuperaDadosUsuario(username: RetornarUserPorUsernameViewModel): Observable<UserModel>  {
    return this.http.post<UserModel>(`${this.apiUrl}/Usuario`, username);
  }
}
