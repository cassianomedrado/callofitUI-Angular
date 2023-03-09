import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChamadoModel } from 'src/app/Models/ChamadoModel';
import { RequestBuscarChamados } from 'src/app/Models/Requests/RequestBuscarChamados';
import { UserModel } from 'src/app/Models/UserModel';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { HomeService } from 'src/app/services/HomeService/home.service';
import { ListaChamadosService } from 'src/app/services/ListaChamadosService/lista-chamados.service';
import { LoadingService } from 'src/app/services/utils/loading/loading.service';

@Component({
  selector: 'app-lista-finalizados',
  templateUrl: './lista-finalizados.component.html',
  styleUrls: ['./lista-finalizados.component.css']
})
export class ListaFinalizadosComponent implements OnInit, AfterViewInit {
  public listaChamados: ChamadoModel[] = []
  public user: UserModel = new UserModel();

  page = 1;
  pageSize = 5;
  Math = Math;
  imagemClicada = false;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private homeService: HomeService,
    private loadingService: LoadingService,
    private cd: ChangeDetectorRef,
    private listaChamadosService: ListaChamadosService,
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

    await this.listaChamadosService.BuscarChamados( new RequestBuscarChamados(this.user.id, 3)).subscribe({
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
}
