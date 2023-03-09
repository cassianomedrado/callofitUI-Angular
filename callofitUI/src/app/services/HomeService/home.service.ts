import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuscaTotaisChamados } from 'src/app/Models/BuscaTotaisChamados';
import { ChamadoPOSTViewModel } from 'src/app/Models/ChamadoPOSTViewModel';
import { RequestDeleteChamado } from 'src/app/Models/Requests/RequestDeleteChamado';
import { RequestTotaisChamados } from 'src/app/Models/Requests/RequestTotaisChamados';
import { SistemaSuportadoModel } from 'src/app/Models/SistemaSuportadoModel';
import { StatusChamadoModel } from 'src/app/Models/StatusChamadoModel';
import { TipoChamadoModel } from 'src/app/Models/TipoChamadoModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public ObterTodosStatusChamado(): Observable<StatusChamadoModel[]>  {
    return this.http.get<StatusChamadoModel[]>(`${this.apiUrl}/StatusChamado`);
  }

  public ObterTodosSistemasSuportados(): Observable<SistemaSuportadoModel[]>  {
    return this.http.get<SistemaSuportadoModel[]>(`${this.apiUrl}/SistemaSuportado`);
  }

  public ObterTodosTipoChamado(): Observable<TipoChamadoModel[]>  {
    return this.http.get<TipoChamadoModel[]>(`${this.apiUrl}/TipoChamado`);
  }

  public AbrirChamado(chamado: ChamadoPOSTViewModel): Observable<any>  {
    return this.http.post<ChamadoPOSTViewModel>(`${this.apiUrl}/Chamado`, chamado);
  }

  public BuscaTotalChamados(request: RequestTotaisChamados): Observable<BuscaTotaisChamados>  {
    return this.http.post<BuscaTotaisChamados>(`${this.apiUrl}/Chamado/totais`, request);
  }

  public DeletaChamadoPorId(request: RequestDeleteChamado): Observable<BuscaTotaisChamados>  {
    return this.http.post<BuscaTotaisChamados>(`${this.apiUrl}/Chamado/delete`, request);
  }
}
