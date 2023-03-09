import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, LoginUserModel } from 'src/app/Models/LoginUserModel';
import { RetornarUserPorUIdViewModel, RetornarUserPorUsernameViewModel, UserModel } from 'src/app/Models/UserModel';
import { RequestAlterarSenhaUsuario } from 'src/app/Models/Requests/RequestAlterarSenhaUsuario';

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

  public RecuperaDadosUsuarioPorID(request: RetornarUserPorUIdViewModel): Observable<UserModel>  {
    return this.http.post<UserModel>(`${this.apiUrl}/Usuario/Usuario-por-id`, request);
  }

  public AlterarSenhaUsuario(username: RequestAlterarSenhaUsuario): Observable<any>  {
    return this.http.post<any>(`${this.apiUrl}/Usuario/alterarSenha`, username);
  }
}
