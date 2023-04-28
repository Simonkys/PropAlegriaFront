import { OnInit, inject } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
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
                items: this.getModelFor()
            },
            
        ];
    }

    getModelFor() {
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

        return [dashboard, trabajadores, usuarios]

        
    }
}
