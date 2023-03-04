export class LoginUserModel {
    public username: string = '';
    public senha: string = '';
}

export class LoginResponse {
    public status: number = 0;
    public token: string = '';
}
  