import { OnInit, inject } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TipoUsuario } from '../propiedades-alegria/core/auth.model';
import { AuthService } from '../propiedades-alegria/core/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    layoutService = inject(LayoutService) 
    authService = inject(AuthService)
    model: any[] = [];


    ngOnInit() {
        
        this.model = [
            {
                label: 'Home',
                items: this.getModelFor(this.authService.getCurrentUser()?.Tipo_trabajador as TipoUsuario)
            },
            
        ];
    }

    getModelFor(tipoUsuario: TipoUsuario) {
        const dashboard = {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
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

        if(tipoUsuario === TipoUsuario.GERENTE) {
            return [dashboard, trabajadores, usuarios]
        } else if (tipoUsuario === TipoUsuario.SECRETARIA_ADMIN) {
            return [dashboard, trabajadores]
        } else if (tipoUsuario === TipoUsuario.EJECUTIVO_VENTAS) {
            return []
        }
        else {
            return []
        }
    }
}
