import { Route } from "@angular/router";
import { ArrendatarioComponent } from "./arrendatario.component";


export const ARRENDATARIO_ROUTES: Route[] = [
    {
        path: '',
        component: ArrendatarioComponent,
        children: [
            
        ]
    }
]