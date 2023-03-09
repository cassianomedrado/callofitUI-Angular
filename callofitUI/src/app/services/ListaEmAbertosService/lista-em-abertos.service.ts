import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoModel } from 'src/app/Models/ChamadoModel';
import { RequestBuscarChamados } from 'src/app/Models/Requests/RequestBuscarChamados';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaEmAbertosService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public BuscarChamados(request: RequestBuscarChamados): Observable<ChamadoModel[]>  {
    return this.http.post<ChamadoModel[]>(`${this.apiUrl}/Chamado/chamados-por-usuario`, request);
  }
}
