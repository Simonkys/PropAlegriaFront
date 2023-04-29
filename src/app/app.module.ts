import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ProductService } from './propiedades-alegria/dashboard/service/product.service';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './propiedades-alegria/core/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './propiedades-alegria/core/interceptors/token.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, AppLayoutModule, ButtonModule],
    providers: [
        ProductService,
        AuthService,
        provideHttpClient(withInterceptors([TokenInterceptor])),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
