
import {Injectable} from '@angular/core'
import { PermisoEnum, PermisoOption, Usuario, PermisoDjango } from './usuario.model'


@Injectable({
    providedIn: 'root'
})
export class PermisoService {
    permisiosOption = new Map<PermisoEnum, PermisoOption>()
    constructor(){
        this.permisiosOption.set(PermisoEnum.SuperUsuario, { permName: 'Super usuario', permValue: PermisoEnum.SuperUsuario, permHelp: '* Usuario con acceso a todas las funcionalidades.'} )
        this.permisiosOption.set(PermisoEnum.Staff, { permName: 'Staff', permValue: PermisoEnum.Staff, permHelp: '* Usuario con acceso a todas las funcionalidades con excepción de la gestión de cuentas de usuarios.'}),
        this.permisiosOption.set(PermisoEnum.Simple, { permName: 'Simple', permValue: PermisoEnum.Simple, permHelp: '* Usuario con acceso solo a funciones de caja chica.'}, )
    }

    permisosOptionsArray() {
        return Array.from(this.permisiosOption.values())
    }

    mapfromUsuario(user: Usuario) {
        if (user.is_staff && user.is_superuser) {
            return this.permisiosOption.get(PermisoEnum.SuperUsuario)
        }
        if (user.is_staff){
            return this.permisiosOption.get(PermisoEnum.Staff)
        }
        return this.permisiosOption.get(PermisoEnum.Simple)
    }

    mapToDjango(permiso: PermisoEnum): PermisoDjango{
        if(permiso === PermisoEnum.SuperUsuario) {
            return {is_staff: true, is_superuser: true}
        }
        if(permiso === PermisoEnum.Staff){
            return {is_staff: true, is_superuser: false}
        } else {
            return {is_staff: false, is_superuser: false}
        } 
    }
}