export class UserModel {
    public id: number = 0;
    public data_criacao:  Date = new Date();
    public nome: string = '';
    public email: string = '';
    public tipo_usuario_id: number = 0;
    public username: string = '';
    public status: boolean = false;
}

export class RetornarUserPorUsernameViewModel{
    public username: string = '';

    constructor(_username: string){
        this.username = _username;
    }
}

export class RetornarUserPorUIdViewModel{
    public id: Number = 0;

    constructor(id: Number){
        this.id = id;
    }
}