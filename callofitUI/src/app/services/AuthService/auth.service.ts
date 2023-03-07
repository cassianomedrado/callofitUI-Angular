import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/Models/UserModel';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRATION_KEY = 'auth_token_expiration';

  private readonly USER_ID = 'auth_user_id';
  private readonly USER_DATA_CRIACAO = 'auth_user_data_criacao';
  private readonly USER_NOME = 'auth_user_nome';
  private readonly USER_EMAIL = 'auth_user_email';
  private readonly USER_TIPO_USUARIO = 'auth_user_tipo_usuario';
  private readonly USER_USERNAME = 'auth_user_username';
  private readonly USER_STATUS = 'auth_user_status';

  constructor() {}

  isLoggedIn(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null && !this.isTokenExpired();
  }

  login(token: string, username: string): void {
    const expiresIn = 21600; // 6 horas em segundos
    // const expiresIn = 300; // 5 minutos
    const expirationDate = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRATION_KEY, expirationDate.toString());
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);

    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem(this.USER_DATA_CRIACAO);
    localStorage.removeItem(this.USER_NOME);
    localStorage.removeItem(this.USER_EMAIL);
    localStorage.removeItem(this.USER_TIPO_USUARIO);
    localStorage.removeItem(this.USER_USERNAME);
    localStorage.removeItem(this.USER_STATUS);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? '';
  }

  private isTokenExpired(): boolean {
    const expirationDate = localStorage.getItem(this.EXPIRATION_KEY);
    if (!expirationDate) {
      return true;
    }
    const expiration = new Date(Number(expirationDate));
    return expiration.getTime() <= new Date().getTime();
  }

  ArmazenarDadosUsuario(usuario: UserModel): void {
    localStorage.setItem(this.USER_ID, usuario.id.toString());
    localStorage.setItem(this.USER_DATA_CRIACAO, usuario.data_criacao.toString());
    localStorage.setItem(this.USER_NOME, usuario.nome);
    localStorage.setItem(this.USER_EMAIL, usuario.email);
    localStorage.setItem(this.USER_TIPO_USUARIO, usuario.tipo_usuario_id.toString());
    localStorage.setItem(this.USER_USERNAME, usuario.username);
    localStorage.setItem(this.USER_STATUS, usuario.status.toString());
  }

  RetornarDadosUsuario(): UserModel {
    const user = new UserModel();
    const ID = localStorage.getItem(this.USER_ID);
    const USER_DATA_CRIACAO = localStorage.getItem(this.USER_DATA_CRIACAO);
    const USER_NOME = localStorage.getItem(this.USER_NOME);
    const USER_EMAIL = localStorage.getItem(this.USER_EMAIL);
    const USER_TIPO_USUARIO = localStorage.getItem(this.USER_TIPO_USUARIO);
    const USER_USERNAME = localStorage.getItem(this.USER_USERNAME);
    const USER_STATUS = localStorage.getItem(this.USER_STATUS);

    if (ID !== null) {
      user.id = parseInt(ID, 10); 
    }

    if (USER_DATA_CRIACAO !== null) {
      user.data_criacao = new Date(USER_DATA_CRIACAO);
    }

    if (USER_NOME !== null) {
      user.nome = USER_NOME; 
    }

    if (USER_EMAIL !== null) {
      user.email = USER_EMAIL; 
    }

    if (USER_TIPO_USUARIO !== null) {
      user.tipo_usuario_id = parseInt(USER_TIPO_USUARIO, 10);
    }

    if (USER_USERNAME !== null) {
      user.username = USER_USERNAME, 10; 
    }

    if (USER_STATUS !== null) {
      user.status = Boolean(USER_STATUS); ;
    }

    return  user;
  }
}
