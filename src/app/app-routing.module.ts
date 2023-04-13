import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard } from './demo/guards/auth.guard';
import { NotFoundComponent } from './propiedades-alegria/pages/not-found/not-found.component';

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
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'empleados',
                            loadComponent: () =>
                                import(
                                    './propiedades-alegria/pages/empleados/empleados.component'
                                ).then((m) => m.EmpleadosComponent),
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
                        {
                            path: 'perfil',
                            loadComponent: () =>
                                import(
                                    './propiedades-alegria/pages/perfil/perfil.component'
                                ).then((m) => m.PerfilComponent),
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
