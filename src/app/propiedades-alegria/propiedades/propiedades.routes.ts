import { Route } from "@angular/router";
import { PropiedadComponent } from "./propiedades.component";
import { ActualizarPropiedadPageComponent } from "./pages/actualizar-propiedad-page/actualizar-propiedad-page.component";
import { DetallePropiedadPageComponent } from "./pages/detalle-propiedad-page/detalle-propiedad-page.component";
import { ListadoPropiedadesPageComponent } from "./pages/listado-propiedades-page/listado-propiedades-page.component";
import { RegistroPropiedadPageComponent } from "./pages/registro-propiedad-page/registro-propiedad-page.component";

export const PROPIEDADES_ROUTES: Route[] = [
    {
        path: "",
        component: PropiedadComponent,
        children: [
            {
                path: "listado",
                component: ListadoPropiedadesPageComponent
            },
            {
                path: 'registro',
                component: RegistroPropiedadPageComponent
            },
            {
                path: ":id/detalle",
                component: DetallePropiedadPageComponent
            },
            {
                path: ":id/actualizar",
                component: ActualizarPropiedadPageComponent
            }
        ]
    },
]
