import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChamadoPOSTViewModel } from 'src/app/Models/ChamadoPOSTViewModel';
import { RequestTotaisChamados } from 'src/app/Models/Requests/RequestTotaisChamados';
import { SistemaSuportadoModel } from 'src/app/Models/SistemaSuportadoModel';
import { StatusChamadoModel } from 'src/app/Models/StatusChamadoModel';
import { TipoChamadoModel } from 'src/app/Models/TipoChamadoModel';
import { UserModel } from 'src/app/Models/UserModel';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { HomeService } from 'src/app/services/HomeService/home.service';
import { LoadingService } from 'src/app/services/utils/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgbTooltipModule, FormsModule, CommonModule]
})
export class HomeComponent implements OnInit, AfterViewInit {
  public chamadoPost: ChamadoPOSTViewModel = new ChamadoPOSTViewModel();
  public user: UserModel = new UserModel();
  public listaStatusChamado: StatusChamadoModel[] = []
  public listaSistemaSuportado: SistemaSuportadoModel[] = []
  public listaTipoChamado: TipoChamadoModel[] = []
  public chamadosEmAberto: Number = 0;
  public chamadosPendentes: Number = 0;
  public chamadosFinalizados: Number = 0;
  public chamadosAtrasados: Number = 0;
  public imagemClicada = false;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private homeService: HomeService,
    private loadingService: LoadingService,
    private cd: ChangeDetectorRef) { }

  public async ngOnInit(): Promise<void> {
    this.user = this.authService.RetornarDadosUsuario();
  } 

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      await this.BuscaTotalChamados();
    });

  }

  async open(content: any) {
   
    this.chamadoPost.usuario_id = this.user.id
    this.chamadoPost.data_limite = new Date().toISOString().slice(0,10)
    this.chamadoPost.status_chamado_id = 1; //PADRÃO EM ABERTO
    this.chamadoPost.tipo_chamado_id = 6; //PADRÃO NORMAL
    this.chamadoPost.sistema_suportado_id = 0; 

    //LISTA STATUS DE CHAMADOS
    await this.obterListaStatus()
    //LISTA SISTEMAS SUPORTADOS
    await this.Obterlistasistemas()
    //LISTA TIPOS DE CHAMADOS
    await this.ObterListaTipoChamado();

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result: any) => {
      console.log(`Fechar modal com resultado: ${result}`);
    }, (reason: any) => {
      console.log(`Dismissed com razão: ${reason}`);
    });
  }

  async obterListaStatus() {
    this.loadingService.Show(); 
    await this.homeService.ObterTodosStatusChamado().subscribe({
      next: (response) => {
        this.listaStatusChamado = response;
        this.loadingService.Hide();
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
      }
    });
  }

  async Obterlistasistemas() {
    this.loadingService.Show(); 
    await this.homeService.ObterTodosSistemasSuportados().subscribe({
      next: (response) => {
        this.listaSistemaSuportado = response;
        this.loadingService.Hide();
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
      }
    });
  }

  async ObterListaTipoChamado(){
    this.loadingService.Show(); 
    await this.homeService.ObterTodosTipoChamado().subscribe({
      next: (response) => {
        this.listaTipoChamado = response;
        this.loadingService.Hide();
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
      }
    });
  }

  async BuscaTotalChamados() {
    this.loadingService.Show(); 

    await this.homeService.BuscaTotalChamados( new RequestTotaisChamados(this.user.id)).subscribe({
      next: (response) => {
        this.chamadosEmAberto = response.chamadosEmAberto
        this.chamadosPendentes = response.chamadosPendentes
        this.chamadosFinalizados = response.chamadosFinalizados
        this.chamadosAtrasados  = response.chamadosAtrasados
        this.cd.detectChanges();

        this.loadingService.Hide(); 
      },
      error: (error) => {
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
            this.toastr.error(er.mensagem);
          });
        }
      }
    });
  }

  async salvar() {
    this.loadingService.Show(); 
    await this.homeService.AbrirChamado(this.chamadoPost).subscribe({
      next: (response) => {
        this.modalService.dismissAll();
        this.loadingService.Hide(); //Esconde spinner de loading
        this.toastr.success('Chamado aberto com sucesso!');
        this.router.navigate(['/home']);
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
      }
    });
  }

  async refreshPage(){
    this.imagemClicada = true;
    setTimeout(() => {
      this.imagemClicada = false;
    }, 200); // Tempo em milissegundos
    
    await this.BuscaTotalChamados();
  }

  ativarGif() {
    let imagem = document.getElementById('imagem-refres') as HTMLImageElement;
    imagem.src = '../../../assets/gif/refresh.gif';
  }

  desativarGif() {
    let imagem = document.getElementById('imagem-refres') as HTMLImageElement;
    imagem.src = '../../../assets/img/refresh.png';
  }

  abrirListaChamados(){
    this.router.navigate(['/chamados-em-aberto']);
  }

  abrirListaChamadosPendentes(){
    this.router.navigate(['/chamados-pendentes']);
  } 

  abrirListaChamadosFinalizados(){
    this.router.navigate(['/chamados-finalizados']);
  } 

  abrirListaChamadosAtrasados(){
    this.router.navigate(['/chamados-atrasados']);
  } 
}
