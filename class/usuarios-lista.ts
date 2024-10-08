import { Usuario } from "./usuario";

//Lógica de todos los usuarios
export class UsuariosLista {
    private lista: Usuario[] = []

    public agregar(usuario: Usuario){
        this.lista.push(usuario)
        return usuario
    }

    public actualizarNombre(id: string, nombre: string){
        for (let usuario of this.lista) {
            if(usuario.id === id){
                usuario.nombre = nombre
                break;
            }
        }

        console.log("===== Actualizando Usuario =====")
    }

    public getLista(){
        return this.lista
    }

    public getUsuario(id: string){
        return this.lista.find(usuario => {
            return usuario.id === id
        })
    }

    public getUsuariosBySala(sala: string){
        return this.lista.filter(usuario => {
            return usuario.sala === sala
        })
    }

    public borrarUsuario(id: string){
        const tempUsuario = this.getUsuario(id)

        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id
        })

        return tempUsuario;
    }
}