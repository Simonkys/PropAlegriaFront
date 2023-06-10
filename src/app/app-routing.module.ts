import { RouterModule } from '@angular/router';
import { NgModule, inject } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotFoundComponent } from './propiedades-alegria/pages/not-found/not-found.component';
import { authGuard } from './propiedades-alegria/core/guards/auth.guard';
import { AuthService } from './propiedades-alegria/core/services/auth.service';



@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    canActivate: [authGuard],
                    children: [
                        {
                            path: 'dashboard',
                            canActivate: [
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () => import( './propiedades-alegria/dashboard/dashboard.module' ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'trabajadores',
                            canActivate: [
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () => import( './propiedades-alegria/trabajadores/trabajadores.routes' ).then((m) => m.TRABAJADORES_ROUTES),
                        },
                        {
                            path: 'externos',
                            canActivate: [
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () => import( './propiedades-alegria/externos/externos.routes' ).then((m) => m.EXTERNOS_ROUTES),
                        },
                        {
                            path: 'propiedades',
                            canActivate: [
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () => import('./propiedades-alegria/propiedades/propiedades.routes').then(m => m.PROPIEDADES_ROUTES)
                        },
                        {
                            path: 'propietarios',
                            canActivate:[
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () => import('./propiedades-alegria/propietarios/propietario.routes').then(m => m.PROPIETARIO_ROUTES)
                        },
                        {
                            path: 'arrendatarios',
                            canActivate:[
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () => import('./propiedades-alegria/arrendatarios/arrendatario.routes').then(m => m.ARRENDATARIO_ROUTES)
                        },
                        {
                            path: 'arriendos',
                            canActivate: [
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () => import('./propiedades-alegria/arriendos/arriendo.route').then(m => m.ARRIENDO_ROUTES)
                        },
                        {
                            path: 'servicios-extra',
                            canActivate: [  
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () => import( './propiedades-alegria/servicios-extra/servicios-extra.routes').then((m) => m.SERVICIOS_EXTRA_ROUTES),
                        },
                        {
                            path: 'usuarios',
                            canActivate: [  
                                () => inject(AuthService).isSuperuser()
                            ],
                            loadChildren: () => import( './propiedades-alegria/usuarios/usuarios.routes').then((m) => m.USUARIO_ROUTES),
                        },
                        {
                            path: 'empty',
                            loadComponent: () => import('./propiedades-alegria/pages/empty/empty.component').then(m => m.EmptyComponent)
                        },
                    ],
                },
                {
                    path: 'auth',
                    children: [
                        {
                            path: 'login',
                            loadComponent: () => import( './propiedades-alegria/pages/login/login.component' ).then((m) => m.LoginComponent),
                        },
                    ],
                },
                { path: 'notfound', component: NotFoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
