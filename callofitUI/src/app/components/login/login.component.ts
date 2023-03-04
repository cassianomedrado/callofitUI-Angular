import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse, LoginUserModel } from 'src/app/Models/LoginUserModel';
import { RetornarUserPorUsernameViewModel, UserModel } from 'src/app/Models/UserModel';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { LoginService } from 'src/app/services/LoginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginUser: LoginUserModel = new LoginUserModel();
  private loginResponse: LoginResponse = new LoginResponse();

  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
      this.loginService.Login(this.loginUser).subscribe({
        next: (response) => {
          this.loginResponse = response;
          const token = this.loginResponse.token;

          this.authService.login(token, this.loginUser.username);

          this.loginService.RecuperaDadosUsuario(new RetornarUserPorUsernameViewModel(this.loginUser.username)).subscribe({
            next: (response) => {
              this.authService.ArmazenarDadosUsuario(response);
            },
            error: (error) => {
              if(error.error.errors){
                for (const propriedade in error.error.errors) {
                  const mensagens = error.error.errors[propriedade];
                  mensagens.forEach((mensagem: string) => {
                    this.toastr.error(`${mensagem}`);
                  });
                }
              } 
              if(error.error.error){
                error.error.error.forEach((er: {mensagem:string}) => {
                  this.toastr.error(er.mensagem);
                });
              }
            }
          });

          this.toastr.success('Login realizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          if(error.error.errors){
            for (const propriedade in error.error.errors) {
              const mensagens = error.error.errors[propriedade];
              mensagens.forEach((mensagem: string) => {
                this.toastr.error(`${mensagem}`);
              });
            }
          } 

          if(error.error.error){
            error.error.error.forEach((er: {mensagem:string}) => {
              this.toastr.error(er.mensagem);
            });
          }
        }
      });
  }
}
