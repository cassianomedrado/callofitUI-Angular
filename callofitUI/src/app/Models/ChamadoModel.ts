export class ChamadoModel {
    public id: Number = 0;
    public data_criacao: Date = new Date();
    public solicitante: string = '';
    public data_limite: Date = new Date();
    public status_chamado_id: Number = 0;
    public sistema_suportado_id: Number = 0;
    public descricao_problema: string = '';
    public usuario_id: Number= 0;
    public descricao_solucao: string = '';
    public tipo_chamado_id: Number= 0;
    public identificador_unico: string = '';
}