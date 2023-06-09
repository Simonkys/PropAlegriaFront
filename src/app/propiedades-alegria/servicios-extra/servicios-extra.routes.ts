import { Route } from '@angular/router';

import { ServiciosExtraComponent } from './servicios-extra.component';

import { ListadoServiciosExtraPageComponent } from './pages/listado-servicios-extra-page/listado-servicios-extra-page.component';
import { RegistroServicioExtraPageComponent } from './pages/registro-servicio-extra-page/registro-servicio-extra-page.component';
import { ActualizarServicioExtraPageComponent } from './pages/actualizar-servicio-extra-page/actualizar-servicio-extra-page.component';
import { DetalleServicioExtraPageComponent } from './pages/detalle-servicio-extra-page/detalle-servicio-extra-page.component';

export const SERVICIOS_EXTRA_ROUTES: Route[] = [
    {
        path: '',
        component: ServiciosExtraComponent,
        children: [
            {
                path: 'listado',
                component: ListadoServiciosExtraPageComponent 
            },
            {
                path: 'registro',
                component: RegistroServicioExtraPageComponent                    
            },
            {
                path: ':id/actualizar',
                component: ActualizarServicioExtraPageComponent
            },
            {
                path: ':id/detalle',
                component: DetalleServicioExtraPageComponent
            },
        ],
    },
];