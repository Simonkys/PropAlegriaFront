import { Route } from "@angular/router";
import { PropietarioComponent } from "./propietario.component";
import { DetallePropietarioComponent } from "./detalle-propietario/detalle-propietario.component";
import { ListadoPropietariosComponent } from "./listado-propietarios/listado-propietarios.component";
import { RegistroPropietarioComponent } from "./registro-propietario/registro-propietario.component";
import { ActualizarPropietarioComponent } from "./actualizar-propietario/actualizar-propietario.component";

export const PROPIETARIO_ROUTES: Route[] = [
    {
        path: "",
        component: PropietarioComponent,
        children: [
            {
                path: "listado",
                component: ListadoPropietariosComponent
            },
            {
                path: 'registro',
                component: RegistroPropietarioComponent
            },
            {
                path: ":id/detalle",
                component: DetallePropietarioComponent
            },
            {
                path: ":id/actualizar",
                component: ActualizarPropietarioComponent
            }        
        ]
    },
]
