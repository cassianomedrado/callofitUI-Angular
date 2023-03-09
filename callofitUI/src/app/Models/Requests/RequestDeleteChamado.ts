export class RequestDeleteChamado {
    public usuario_id: Number = 0;
    public chamado_id: Number = 0;

    constructor(usuario_id: Number, chamado_id: Number){
        this.usuario_id = usuario_id;
        this.chamado_id = chamado_id;
    }
}