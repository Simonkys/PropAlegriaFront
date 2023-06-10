import { LOCALE_ID, NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { TokenInterceptor } from './propiedades-alegria/core/interceptors/token.interceptor';

import { ProductService } from './propiedades-alegria/dashboard/service/product.service';
import { AuthService } from './propiedades-alegria/core/services/auth.service';

import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';

registerLocaleData(localeEsCl);


@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule, ButtonModule, ToastModule],
    providers: [
        ProductService,
        AuthService,
        MessageService,
        provideHttpClient(withInterceptors([TokenInterceptor])),
        { provide: LOCALE_ID, useValue: "es-CL" }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
