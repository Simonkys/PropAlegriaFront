import { RouterModule } from '@angular/router';
import { NgModule, inject } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotFoundComponent } from './propiedades-alegria/pages/not-found/not-found.component';
import { authGuard } from './propiedades-alegria/core/guards/auth.guard';
import { AuthService } from './propiedades-alegria/core/auth.service';



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
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'trabajadores',
                            canActivate: [
                                () => inject(AuthService).isStaff()
                            ],
                            loadChildren: () =>
                                import(
                                    './propiedades-alegria/trabajadores/trabajadores.routes'
                                ).then((m) => m.TRABAJADORES_ROUTES),
                        },
                        {
                            path: 'usuarios',
                            canActivate: [ 
                                () => inject(AuthService).isSuperuser()
                            ],
                            loadChildren: () =>
                                import(
                                    './propiedades-alegria/usuarios/usuarios.routes'
                                ).then((m) => m.USUARIO_ROUTES),
                        },
                    ],
                },
                {
                    path: 'auth',
                    children: [
                        {
                            path: 'login',
                            loadComponent: () =>
                                import(
                                    './propiedades-alegria/pages/login/login.component'
                                ).then((m) => m.LoginComponent),
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
