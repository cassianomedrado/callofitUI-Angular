import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse, LoginUserModel } from 'src/app/Models/LoginUserModel';
import { RetornarUserPorUsernameViewModel, UserModel } from 'src/app/Models/UserModel';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { LoadingService } from 'src/app/services/utils/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginUser: LoginUserModel = new LoginUserModel();
  private loginResponse: LoginResponse = new LoginResponse();
  private userModel : UserModel = new UserModel();

  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) { }

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    let sucesso = false;
    this.loadingService.Show(); //Mostra spinner de loading

    this.loginService.Login(this.loginUser).subscribe({
      next: (response) => {
        this.loginResponse = response;
        const token = this.loginResponse.token;
        this.authService.login(token, this.loginUser.username);

        this.loadingService.Hide();
        sucesso = true;
      },
      error: (error) => {
        this.loadingService.Hide(); //Esconde spinner de loading
        if (error.error.errors) {
          for (const propriedade in error.error.errors) {
            const mensagens = error.error.errors[propriedade];
            mensagens.forEach((mensagem: string) => {
              this.toastr.error(`${mensagem}`);
            });
          }
        }

        if (error.error.error) {
          error.error.error.forEach((er: { mensagem: string }) => {
            this.toastr.error(er.mensagem);
          });
        }
      },
      complete: async () => {
        this.loadingService.Show(); //Mostra spinner de loading
        if (sucesso) {
          setTimeout(async () => {
            await this.loginService.RecuperaDadosUsuario(new RetornarUserPorUsernameViewModel(this.loginUser.username)).subscribe({
              next: (response) => {
                this.userModel = response;
                if(this.userModel.tipo_usuario_id != 3){
                  this.loadingService.Hide(); //Esconde spinner de loading
                  this.authService.logout();
                  this.toastr.error(`Usuário não é do tipo cliente.`);
                }else{
                  this.authService.ArmazenarDadosUsuario(response);
                  this.loadingService.Hide(); //Esconde spinner de loading
  
                  this.toastr.success('Login realizado com sucesso!');
                  this.router.navigate(['/home']);
                }               
              },
              error: (error) => {
                this.authService.logout();
                this.loadingService.Hide(); //Esconde spinner de loading
                if (error.error.errors) {
                  for (const propriedade in error.error.errors) {
                    const mensagens = error.error.errors[propriedade];
                    mensagens.forEach((mensagem: string) => {
                      this.toastr.error(`${mensagem}`);
                    });
                  }
                }
                if (error.error.error) {
                  error.error.error.forEach((er: { mensagem: string }) => {
                    this.toastr.error(er.mensagem);
                  });
                }
              }
            });
          });
        }
      },
    });
  }
}
