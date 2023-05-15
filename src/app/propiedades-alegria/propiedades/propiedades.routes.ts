import { Route } from "@angular/router";
import { PropiedadComponent } from "./propiedades.component";
import { ActualizarPropiedadComponent } from "./pages/actualizar-propiedad/actualizar-propiedad.component";
import { DetallePropiedadComponent } from "./pages/detalle-propiedad/detalle-propiedad.component";
import { ListadoPropiedadesComponent } from "./pages/listado-propiedades/listado-propiedades.component";
import { RegistroPropiedadComponent } from "./pages/registro-propiedad/registro-propiedad.component";

export const PROPIEDADES_ROUTES: Route[] = [
    {
        path: "",
        component: PropiedadComponent,
        children: [
            {
                path: "listado",
                component: ListadoPropiedadesComponent
            },
            {
                path: 'registro',
                component: RegistroPropiedadComponent
            },
            {
                path: ":id/detalle",
                component: DetallePropiedadComponent
            },
            {
                path: ":id/actualizar",
                component: ActualizarPropiedadComponent
            }
        ]
    },
]
