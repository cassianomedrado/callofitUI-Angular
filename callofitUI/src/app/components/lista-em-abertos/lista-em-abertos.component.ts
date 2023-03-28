import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChamadoModel } from 'src/app/Models/ChamadoModel';
import { FiltroTabela } from 'src/app/Models/FiltroTabela';
import { RequestBuscarChamados } from 'src/app/Models/Requests/RequestBuscarChamados';
import { RequestDeleteChamado } from 'src/app/Models/Requests/RequestDeleteChamado';
import { SistemaSuportadoModel } from 'src/app/Models/SistemaSuportadoModel';
import { StatusChamadoModel } from 'src/app/Models/StatusChamadoModel';
import { TipoChamadoModel } from 'src/app/Models/TipoChamadoModel';
import { RetornarUserPorUIdViewModel, UserModel } from 'src/app/Models/UserModel';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { HomeService } from 'src/app/services/HomeService/home.service';
import { ListaChamadosService } from 'src/app/services/ListaChamadosService/lista-chamados.service';
import { LoginService } from 'src/app/services/LoginService/login.service';
import { LoadingService } from 'src/app/services/utils/loading/loading.service';
import { StatusChamadoTextoPipe } from '../utils/pipes/status-chamado-texto.pipe';

@Component({
  selector: 'app-lista-em-abertos',
  templateUrl: './lista-em-abertos.component.html',
  styleUrls: ['./lista-em-abertos.component.css'],
  providers: [StatusChamadoTextoPipe]
})

export class ListaEmAbertosComponent implements OnInit, AfterViewInit {
  public listaChamados: ChamadoModel[] = []
  public chamado: ChamadoModel = new ChamadoModel();
  public user: UserModel = new UserModel();
  public listaStatusChamado: StatusChamadoModel[] = []
  public listaSistemaSuportado: SistemaSuportadoModel[] = []
  public listaTipoChamado: TipoChamadoModel[] = []
  public userModel: UserModel = new UserModel();
  public filtro : FiltroTabela = new FiltroTabela();
  
  page = 1;
  pageSize = 5;
  Math = Math;
  imagemClicada = false;
  data_limite = '';
  idChamadoDelete: Number = 0;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private homeService: HomeService,
    private loadingService: LoadingService,
    private cd: ChangeDetectorRef,
    private listaChamadosService: ListaChamadosService,
    private loginService: LoginService,
    config: NgbPaginationConfig) { 
      config.maxSize = 5;
      config.rotate = true;
    }
   
  public async ngOnInit(): Promise<void> {
    this.user = this.authService.RetornarDadosUsuario();
  } 

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      await this.RequestBuscarChamados();
    });

  }

  async RequestBuscarChamados() {
    this.loadingService.Show(); 

    await this.listaChamadosService.BuscarChamados( new RequestBuscarChamados(this.user.id, 1)).subscribe({
      next: (response) => {
        this.listaChamados = response;

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

  async refreshPage(){
    this.imagemClicada = true;
    setTimeout(() => {
      this.imagemClicada = false;
    }, 200); // Tempo em milissegundos
    
     await this.RequestBuscarChamados();
  }

  ativarGif() {
    let imagem = document.getElementById('imagem-refres') as HTMLImageElement;
    imagem.src = '../../../assets/gif/refresh.gif';
  }

  desativarGif() {
    let imagem = document.getElementById('imagem-refres') as HTMLImageElement;
    imagem.src = '../../../assets/img/refresh.png';
  }

  async open(chamado:ChamadoModel, content: any) {

    this.data_limite = this.chamado.data_limite.toISOString().slice(0,10)
    this.chamado = chamado;

    //User dados
    await this.obterUserPorId(this.chamado.tecnico_usuario_id == null ? 0 : this.chamado.tecnico_usuario_id );
    //LISTA STATUS DE CHAMADOS
    await this.obterListaStatus()
    //LISTA SISTEMAS SUPORTADOS
    await this.Obterlistasistemas()
    //LISTA TIPOS DE CHAMADOS
    await this.ObterListaTipoChamado();
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result: any) => {
      this.data_limite = '';
      this.chamado = new ChamadoModel(); 
      this.listaStatusChamado = [];
      this.listaSistemaSuportado = [];
      this.listaTipoChamado = [];
      this.userModel = new UserModel();
    }, (reason: any) => {
      this.data_limite = '';
      this.chamado = new ChamadoModel(); 
      this.listaStatusChamado = [];
      this.listaSistemaSuportado = [];
      this.listaTipoChamado = [];
      this.userModel = new UserModel();
    });
  }

  async openConfirmacao(content: any, id: Number) {
    this.idChamadoDelete = id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result: any) => {
      this.idChamadoDelete = 0;
    }, (reason: any) => {
      this.idChamadoDelete = 0;
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

  async obterUserPorId(tecnico_usuario_id: Number) {
    this.loadingService.Show(); 
    await this.loginService.RecuperaDadosUsuarioPorID(new RetornarUserPorUIdViewModel(tecnico_usuario_id)).subscribe({
      next: (response) => {
        this.userModel = response;
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

  async excluir(){
    this.loadingService.Show(); 
    await this.homeService.DeletaChamadoPorId(new RequestDeleteChamado(this.user.id ,this.idChamadoDelete)).subscribe({
      next: async (response) => {
        this.toastr.success('Chamado excluido com sucesso.');
        this.modalService.dismissAll();
        await this.RequestBuscarChamados();
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

  limparFiltros(){
    this.filtro = new FiltroTabela();
  }
}