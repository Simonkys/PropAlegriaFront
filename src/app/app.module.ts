import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { TokenInterceptor } from './propiedades-alegria/core/interceptors/token.interceptor';

import { ProductService } from './propiedades-alegria/dashboard/service/product.service';
import { AuthService } from './propiedades-alegria/core/services/auth.service';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule, ButtonModule],
    providers: [
        ProductService,
        AuthService,
        MessageService,
        provideHttpClient(withInterceptors([TokenInterceptor])),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
