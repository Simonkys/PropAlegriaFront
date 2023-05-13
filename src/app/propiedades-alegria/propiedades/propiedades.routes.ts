import { Route } from "@angular/router";
import { ListadoPropiedadesComponent } from "./listado-propiedades/listado-propiedades.component";
import { DetallePropiedadComponent } from "./detalle-propiedad/detalle-propiedad.component";
import { PropiedadComponent } from "./propiedades.component";
import { RegistroPropiedadComponent } from "./registro-propiedad/registro-propiedad.component";

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
            }
        ]
    },
]
