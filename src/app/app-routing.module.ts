import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotFoundComponent } from './propiedades-alegria/pages/not-found/not-found.component';
import { authGuard } from './propiedades-alegria/core/guards/auth.guard';



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
                            path: '',
                            canActivate: [],
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'trabajadores',
                            canActivate: [ ],
                            loadChildren: () =>
                                import(
                                    './propiedades-alegria/trabajadores/trabajadores.routes'
                                ).then((m) => m.TRABAJADORES_ROUTES),
                        },
                        {
                            path: 'usuarios',
                            canActivate: [ ],
                            loadChildren: () =>
                                import(
                                    './propiedades-alegria/usuarios/usuarios.routes'
                                ).then((m) => m.USUARIO_ROUTES),
                        },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    './demo/components/uikit/uikit.module'
                                ).then((m) => m.UIkitModule),
                        },
                        {
                            path: 'blocks',
                            loadChildren: () =>
                                import(
                                    './demo/components/primeblocks/primeblocks.module'
                                ).then((m) => m.PrimeBlocksModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
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
