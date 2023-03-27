export class RequestBuscarChamados {
    public usuario_id: Number= 0;
    public status_chamado_id: Number= 0;
    public tecnico_usuario_id: Number= 0;

    constructor(usuario_id: Number, status_chamado_id: Number){
        this.usuario_id = usuario_id;
        this.status_chamado_id = status_chamado_id;
    }
}