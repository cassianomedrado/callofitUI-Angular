import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'statusChamado'
})
export class StatusChamadoPipe implements PipeTransform {
    transform(value: Number): string {
        let retorno = '';
        if (value === 1) {
            retorno =  'Em Aberto';
        }else
        if (value === 1) {
            retorno =  'Pendente';
        }else
        if (value === 1) {
            retorno =  'Finalizado';
        }else
        if (value === 1) {
            retorno =  'Atrasado';
        }else{
            retorno = 'Status não cadastrado';
        }
        return retorno;
    }
}
