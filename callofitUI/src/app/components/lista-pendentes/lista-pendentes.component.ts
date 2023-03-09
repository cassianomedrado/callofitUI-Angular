import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChamadoModel } from 'src/app/Models/ChamadoModel';
import { RequestBuscarChamados } from 'src/app/Models/Requests/RequestBuscarChamados';
import { UserModel } from 'src/app/Models/UserModel';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { HomeService } from 'src/app/services/HomeService/home.service';
import { ListaEmAbertosService } from 'src/app/services/ListaEmAbertosService/lista-em-abertos.service';
import { LoadingService } from 'src/app/services/utils/loading/loading.service';
import { StatusChamadoPipe } from '../utils/pipes/status-chamado.pipe';
@Component({
  selector: 'app-lista-pendentes',
  templateUrl: './lista-pendentes.component.html',
  styleUrls: ['./lista-pendentes.component.css'],
  providers: [StatusChamadoPipe]
})
export class ListaPendentesComponent {
  public listaChamados: ChamadoModel[] = []
  public user: UserModel = new UserModel();

  page = 1;
  pageSize = 5;
  Math = Math;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private homeService: HomeService,
    private loadingService: LoadingService,
    private cd: ChangeDetectorRef,
    private listaEmAbertosService: ListaEmAbertosService,
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

    await this.listaEmAbertosService.BuscarChamados( new RequestBuscarChamados(this.user.id, 2)).subscribe({
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
}
