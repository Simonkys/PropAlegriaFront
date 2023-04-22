import { Route } from '@angular/router';

export const TRABAJADORES_ROUTES: Route[] = [
    {
        path: '',
        children: [
            {
                path: 'listado',
                loadComponent: () =>
                    import(
                        './listado-trabajadores/listado-trabajadores.component'
                    ).then((m) => m.ListadoTrabajadoresComponent),
            },
            {
                path: 'registro',
                loadComponent: () =>
                    import(
                        './registro-trabajador/registro-trabajador.component'
                    ).then((m) => m.RegistroTrabajadorComponent),
            },
            {
                path: ':id/actualizar',
                loadComponent: () =>
                    import(
                        './actualizar-trabajador/actualizar-trabajador.component'
                    ).then((m) => m.ActualizarTrabajadorComponent),
            },
        ],
    },
];
