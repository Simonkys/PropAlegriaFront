import { Route } from "@angular/router";
import { ListadoUsuariosComponent } from "./listado-usuarios/listado-usuarios.component";

export const USUARIO_ROUTES: Route[] = [
    {
        path: '',
        children: [
            {
                path: 'listado',
                component: ListadoUsuariosComponent
            }   
        ]
    }
]