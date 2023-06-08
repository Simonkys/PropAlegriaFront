import { Route } from "@angular/router";
import { ArrendatarioComponent } from "./arrendatario.component";
import { ListadoArrendatariosPageComponent } from "./pages/listado-arrendatarios-page/listado-arrendatarios-page.component";
import { RegistroArrendatariosPageComponent } from "./pages/registro-arrendatarios-page/registro-arrendatarios-page.component";
import { DetalleArrendatariosPageComponent } from "./pages/detalle-arrendatarios-page/detalle-arrendatarios-page.component";
import { ActualizarArrendatariosPageComponent } from "./pages/actualizar-arrendatarios-page/actualizar-arrendatarios-page.component";
import { RegistrarPagoArriendoFormComponent } from "../componentes/registrar-pago-arriendo-form/registrar-pago-arriendo-form.component";


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
            },
            {
                path: 'registro-pago',
                component: RegistrarPagoArriendoFormComponent
            }
        ]
    }
]