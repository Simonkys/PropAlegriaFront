import { Route } from '@angular/router';

import { TrabajadorComponent } from './trabajador.component';

import { ListadoTrabajadoresPageComponent } from './pages/listado-trabajadores-page/listado-trabajadores-page.component';
import { RegistroTrabajadorPageComponent } from './pages/registro-trabajador-page/registro-trabajador-page.component';
import { ActualizarTrabajadorPageComponent } from './pages/actualizar-trabajador-page/actualizar-trabajador-page.component';
import { DetalleTrabajadorPageComponent } from './pages/detalle-trabajador-page/detalle-trabajador-page.component';

export const TRABAJADORES_ROUTES: Route[] = [
    {
        path: '',
        component: TrabajadorComponent,
        children: [
            {
                path: 'listado',
                component: ListadoTrabajadoresPageComponent 
            },
            {
                path: 'registro',
                component: RegistroTrabajadorPageComponent                    
            },
            {
                path: ':id/actualizar',
                component: ActualizarTrabajadorPageComponent
            },
            {
                path: ':id/detalle',
                component: DetalleTrabajadorPageComponent
            },
        ],
    },
];
