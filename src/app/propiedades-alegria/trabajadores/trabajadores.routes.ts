import { Route } from '@angular/router';
import { TrabajadorComponent } from './trabajador.component';
import { ListadoTrabajadoresComponent } from './listado-trabajadores/listado-trabajadores.component';
import { RegistroTrabajadorComponent } from './registro-trabajador/registro-trabajador.component';
import { ActualizarTrabajadorComponent } from './actualizar-trabajador/actualizar-trabajador.component';
import { DetalleTrabajadorComponent } from './detalle-trabajador/detalle-trabajador.component';

export const TRABAJADORES_ROUTES: Route[] = [
    {
        path: '',
        component: TrabajadorComponent,
        children: [
            {
                path: 'listado',
                component: ListadoTrabajadoresComponent 
            },
            {
                path: 'registro',
                component: RegistroTrabajadorComponent                    
            },
            {
                path: ':id/actualizar',
                component: ActualizarTrabajadorComponent
            },
            {
                path: ':id/detalle',
                component: DetalleTrabajadorComponent
            },
        ],
    },
];
