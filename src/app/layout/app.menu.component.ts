import { OnInit, inject } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../propiedades-alegria/core/services/auth.service';
import { filter, map } from 'rxjs';
import { PermisoEnum, PermisoOption } from '../propiedades-alegria/core/models/usuario.model';
import { PermisoService } from '../propiedades-alegria/core/services/permiso.service';

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
            map(user => this.permisoService.mapfromUsuario(user?.usuario!)),
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
            return [dashboard, trabajadores, usuarios]
        } else {
            return [dashboard, trabajadores, usuarios]
        }


        
    }
}
