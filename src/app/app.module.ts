import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ProductService } from './propiedades-alegria/dashboard/service/product.service';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './propiedades-alegria/core/services/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './propiedades-alegria/core/interceptors/token.interceptor';
import { PropiedadesService } from './propiedades-alegria/core/services/propiedades.service';
import { MessageService } from 'primeng/api';
import { PropietarioService } from './propiedades-alegria/core/services/propietario.service';
import { PersonalidadJuridicaService } from './propiedades-alegria/core/services/personalidad-juridica.service';
import { ArrendatarioService } from './propiedades-alegria/core/services/arrendatario.service';
import { ArriendoService } from './propiedades-alegria/core/services/arriendo.service';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule, ButtonModule],
    providers: [
        ProductService,
        AuthService,
        MessageService,
        PropiedadesService,
        PropietarioService,
        PersonalidadJuridicaService,
        ArrendatarioService,
        ArriendoService,
        provideHttpClient(withInterceptors([TokenInterceptor])),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
