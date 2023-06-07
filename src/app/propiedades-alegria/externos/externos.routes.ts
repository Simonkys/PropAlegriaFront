import { Route } from '@angular/router';

import { ExternoComponent } from './externo.component';

import { ListadoExternoPageComponent } from './pages/listado-externo-page/listado-externo-page.component';
import { RegistroExternoPageComponent } from './pages/registro-externo-page/registro-externo-page.component';
import { ActualizarExternoPageComponent } from './pages/actualizar-externo-page/actualizar-externo-page.component';
import { DetalleExternoPageComponent } from './pages/detalle-externo-page/detalle-externo-page.component';

export const EXTERNOS_ROUTES: Route[] = [
    {
        path: '',
        component: ExternoComponent,
        children: [
            {
                path: 'listado',
                component: ListadoExternoPageComponent 
            },
            {
                path: 'registro',
                component: RegistroExternoPageComponent                    
            },
            {
                path: ':id/actualizar',
                component: ActualizarExternoPageComponent
            },
            {
                path: ':id/detalle',
                component: DetalleExternoPageComponent
            },
        ],
    },
];