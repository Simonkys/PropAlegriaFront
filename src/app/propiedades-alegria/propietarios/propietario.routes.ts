import { Route } from "@angular/router";
import { PropietarioComponent } from "./propietario.component";
import { DetallePropietarioComponent } from "./detalle-propietario/detalle-propietario.component";

export const PROPIETARIO_ROUTES: Route[] = [
    {
        path: "",
        component: PropietarioComponent,
        children: [
           {
            path: ":id/detalle",
            component: DetallePropietarioComponent
           }
        ]
    },
]
