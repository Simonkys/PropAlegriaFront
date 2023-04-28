import { OnInit, inject } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../propiedades-alegria/core/auth.service';
import { filter, map } from 'rxjs';
import { PermisoEnum, PermisoOption } from '../propiedades-alegria/usuarios/usuario.model';
import { PermisoService } from '../propiedades-alegria/usuarios/permiso.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {


    layoutService = inject(LayoutService) 
    authService = inject(AuthService)
    permisoService = inject(PermisoService)
    model: any[] = [];

    
    ngOnInit(): void {
        this.authService.user$.pipe(
            filter(user => user ? true: false),
            map(user => this.permisoService.mapfromUsuario(user?.Usuario!)),
            map(perm => this.getModelFor(perm))
        ).subscribe(items => {
            this.model = [
                {
                    label: 'Home',
                    items: items
                }
            ]
        })
    }

    getModelFor(userPermOption: PermisoOption) {
        console.log(userPermOption)
        const dashboard = {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard'],
        }
        const trabajadores = {
            label: 'Trabajadores',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/trabajadores/listado'],
        }
        const usuarios = {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-lock',
            routerLink: ['/usuarios/listado'],
        }

        if(userPermOption.permValue === PermisoEnum.SuperUsuario) {
            return [dashboard, trabajadores, usuarios]
        }
        if (userPermOption.permValue === PermisoEnum.Staff) {
            return [dashboard, trabajadores]
        } else {
            return []
        }


        
    }
}
