import { Route } from "@angular/router";
import { PropietarioComponent } from "./propietario.component";
import { DetallePropietarioPageComponent } from "./pages/detalle-propietario-page/detalle-propietario-page.component";
import { ListadoPropietariosPageComponent } from "./pages/listado-propietarios-page/listado-propietarios-page.component";
import { RegistroPropietarioPageComponent } from "./pages/registro-propietario-page/registro-propietario-page.component";
import { ActualizarPropietarioPageComponent } from "./pages/actualizar-propietario-page/actualizar-propietario-page.component";

export const PROPIETARIO_ROUTES: Route[] = [
    {
        path: "",
        component: PropietarioComponent,
        children: [
            {
                path: "listado",
                component: ListadoPropietariosPageComponent
            },
            {
                path: 'registro',
                component: RegistroPropietarioPageComponent
            },
            {
                path: ":id/detalle",
                component: DetallePropietarioPageComponent
            },
            {
                path: ":id/actualizar",
                component: ActualizarPropietarioPageComponent
            }        
        ]
    },
]
