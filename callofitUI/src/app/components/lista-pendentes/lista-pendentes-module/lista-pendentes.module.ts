import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbPaginationModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { StatusChamadoPipe } from "../../utils/pipes/status-chamado.pipe";
import { ListaPendentesComponent } from "../lista-pendentes.component";

@NgModule({
  declarations: [
    ListaPendentesComponent, 
    StatusChamadoPipe
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbTooltipModule,
    FormsModule
  ],
  exports: [ListaPendentesComponent],
})

export class ListaPendentesModule { }
