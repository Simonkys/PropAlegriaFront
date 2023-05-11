import { Route } from "@angular/router";
import { PropietarioComponent } from "./propietario.component";
import { DetallePropietarioComponent } from "./detalle-propietario/detalle-propietario.component";
import { ListadoPropietariosComponent } from "./listado-propietarios/listado-propietarios.component";

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
                path: ":id/detalle",
                component: DetallePropietarioComponent
            }
        ]
    },
]
