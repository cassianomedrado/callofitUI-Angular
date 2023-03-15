import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RequestAlterarSenhaUsuario } from './Models/Requests/RequestAlterarSenhaUsuario';
import { UserModel } from './Models/UserModel';
import { AuthService } from './services/AuthService/auth.service';
import { LoginService } from './services/LoginService/login.service';
import { LoadingService } from './services/utils/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('confirma') confirmaModal: TemplateRef<HTMLElement> | undefined;

  user: UserModel = new UserModel();
  requestAlterarSenhaUsuario: RequestAlterarSenhaUsuario = new RequestAlterarSenhaUsuario();
  loading$ = this.loadingService.loading$;
  title = 'callofitUI';
  showMenu = false;

  private modalconfirmaModalRef: NgbModalRef | undefined;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private loadingService: LoadingService,
    private modalService: NgbModal,
    private loginService: LoginService) { }

  public ngOnInit(): void {
    this.start();
  }

  private start() {
    this.showMenu = this.authService.isLoggedIn();
    this.user = this.authService.RetornarDadosUsuario();
  }

  public onRouterChange() {
    this.showMenu = this.authService.isLoggedIn();

    if (!this.authService.isLoggedIn()) {
      this.showMenu = false;
    }
  }

  public logout() {
    this.authService.logout();
    this.toastr.success('Deslogado com sucesso!');
    this.router.navigate(['/login']);
  }

  async open(content: any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result: any) => {
      this.requestAlterarSenhaUsuario = new RequestAlterarSenhaUsuario();
    }, (reason: any) => {
      this.requestAlterarSenhaUsuario = new RequestAlterarSenhaUsuario();
    });
  }

  async openConfirmacao(content: any) {

    if (this.requestAlterarSenhaUsuario == null) {
      this.toastr.error('Preencha os campos para continuar');
    } else if (this.requestAlterarSenhaUsuario.email == '') {
      this.toastr.error('Informe o e-mail.');
    } else if (this.requestAlterarSenhaUsuario.senhaAtual == '') {
      this.toastr.error('Informe senha atual.');
    } else if (this.requestAlterarSenhaUsuario.senhaNova == '') {
      this.toastr.error('Informe nova senha.');
    } else if (this.requestAlterarSenhaUsuario.confirmaNovaSenha == '') {
      this.toastr.error('Informe a confirmação da nova senha.');
    } else {
      this.modalconfirmaModalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' })
      this.modalconfirmaModalRef.result.then((result: any) => {}, (reason: any) => {});
    }
  }

  async trocarSenha() {
    this.requestAlterarSenhaUsuario.username = this.user.username;
    this.loadingService.Show();
    await this.loginService.AlterarSenhaUsuario(this.requestAlterarSenhaUsuario).subscribe({
      next: (response) => {
        let resp = response;
        this.toastr.success('Senha alterada com sucesso!');
        this.loadingService.Hide();
        this.modalService.dismissAll();
      },
      error: (error) => {
        this.modalconfirmaModalRef?.close();
        this.loadingService.Hide();
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
            this.toastr.error(er.mensagem == 'Senha incorreta' ? 'Senha atual incorreta' : er.mensagem);
          });
        }
      }
    });
  }
}
