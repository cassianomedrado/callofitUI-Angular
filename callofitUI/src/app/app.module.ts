import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/AuthInterceptorService/auth-interceptor.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './components/utils/loading-spinner/loading-spinner.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalComponent } from './components/utils/generic-modal/generic-modal.component';
import { CommonModule } from '@angular/common';
import { ListaPendentesComponent } from './components/lista-pendentes/lista-pendentes.component';
import { StatusChamadoTextoPipe } from './components/utils/pipes/status-chamado-texto.pipe';
import { ListaEmAbertosComponent } from './components/lista-em-abertos/lista-em-abertos.component';
import { ListaFinalizadosComponent } from './components/lista-finalizados/lista-finalizados.component';
import { ListaAtrasadosComponent } from './components/lista-atrasados/lista-atrasados.component';
import { FilterPipe } from './components/utils/pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent,
    GenericModalComponent,
    ListaPendentesComponent,
    ListaEmAbertosComponent,
    StatusChamadoTextoPipe,
    ListaFinalizadosComponent,
    ListaAtrasadosComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbTooltipModule,
    NgbModule,
    CommonModule,
    NgbPaginationModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }