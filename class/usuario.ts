export class Usuario {
    public id: string //id del token que se está conectando
    public nombre: string;
    public sala: string; //el usuario solo puede estar solo en 1 sala

    constructor(id: string){
        this.id = id
        this.nombre = 'NaN' //cuando se abre la app no debe de haber usuario asignado
        this.sala = 'NaN'
    }
}