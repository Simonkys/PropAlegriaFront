import { Route } from "@angular/router";
import { ArriendoComponent } from "./arriendo.component";

import { ListadoArriendosPageComponent } from "./pages/listado-arriendos-page/listado-arriendos-page.component";
import { RegistroArriendoPageComponent } from "./pages/registro-arriendo-page/registro-arriendo-page.component";
import { DetalleArriendoPageComponent } from "./pages/detalle-arriendo-page/detalle-arriendo-page.component";
import { ActualizarArriendoPageComponent } from "./pages/actualizar-arriendo-page/actualizar-arriendo-page.component";

export const ARRIENDO_ROUTES: Route[] = [
    {
        path: '',
        component: ArriendoComponent,
        children: [
            {
                path: 'listado',
                component: ListadoArriendosPageComponent
            },
            {
                path: 'registro',
                component: RegistroArriendoPageComponent
            },
            {
                path: ':id/detalle',
                component: DetalleArriendoPageComponent
            },
            {
                path: ':id/actualizar',
                component: ActualizarArriendoPageComponent
            }
        ]
    }
]