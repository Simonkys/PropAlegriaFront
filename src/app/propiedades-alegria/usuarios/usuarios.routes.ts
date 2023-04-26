import { Route } from "@angular/router";
import { ListadoUsuariosComponent } from "./listado-usuarios/listado-usuarios.component";
import { RegistroUsuarioComponent } from "./registro-usuario/registro-usuario.component";

export const USUARIO_ROUTES: Route[] = [
    {
        path: '',
        children: [
            {
                path: 'listado',
                component: ListadoUsuariosComponent
            },
            {
                path: 'registro',
                component: RegistroUsuarioComponent
            }
        ]
    }
]