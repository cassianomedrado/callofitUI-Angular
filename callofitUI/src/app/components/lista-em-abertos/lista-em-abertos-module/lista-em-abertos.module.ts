import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbPaginationModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { StatusChamadoPipe } from "../../utils/pipes/status-chamado.pipe";
import { ListaEmAbertosComponent } from "../lista-em-abertos.component";

@NgModule({
  declarations: [
    ListaEmAbertosComponent, StatusChamadoPipe],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbTooltipModule,
    FormsModule
  ],
  exports: [ListaEmAbertosComponent],
})

export class ListaEmAbertosModule { }
