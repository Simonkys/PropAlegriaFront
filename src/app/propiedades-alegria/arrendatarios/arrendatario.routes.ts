import { Route } from "@angular/router";
import { ArrendatarioComponent } from "./arrendatario.component";
import { ListadoArrendatariosPageComponent } from "./listado-arrendatarios-page/listado-arrendatarios-page.component";
import { RegistroArrendatariosPageComponent } from "./registro-arrendatarios-page/registro-arrendatarios-page.component";
import { DetalleArrendatariosPageComponent } from "./detalle-arrendatarios-page/detalle-arrendatarios-page.component";
import { ActualizarArrendatariosPageComponent } from "./actualizar-arrendatarios-page/actualizar-arrendatarios-page.component";


export const ARRENDATARIO_ROUTES: Route[] = [
    {
        path: '',
        component: ArrendatarioComponent,
        children: [
            {
                path: 'listado',
                component: ListadoArrendatariosPageComponent
            },
            {
                path: 'registro',
                component: RegistroArrendatariosPageComponent
            },
            {
                path: ":id/detalle",
                component: DetalleArrendatariosPageComponent
            },
            {
                path: ":id/actualizar",
                component: ActualizarArrendatariosPageComponent
            }
        ]
    }
]