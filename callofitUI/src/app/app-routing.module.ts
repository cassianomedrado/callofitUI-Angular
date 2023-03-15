import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListaAtrasadosComponent } from './components/lista-atrasados/lista-atrasados.component';
import { ListaEmAbertosComponent } from './components/lista-em-abertos/lista-em-abertos.component';
import { ListaFinalizadosComponent } from './components/lista-finalizados/lista-finalizados.component';
import { ListaPendentesComponent } from './components/lista-pendentes/lista-pendentes.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/AuthService/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
  { path: 'chamados-em-aberto', component: ListaEmAbertosComponent , canActivate: [AuthGuardService]},
  { path: 'chamados-pendentes', component: ListaPendentesComponent , canActivate: [AuthGuardService]},
  { path: 'chamados-finalizados', component: ListaFinalizadosComponent , canActivate: [AuthGuardService]},
  { path: 'chamados-atrasados', component: ListaAtrasadosComponent , canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent , canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
