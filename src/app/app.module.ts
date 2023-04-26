import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './propiedades-alegria/core/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './propiedades-alegria/core/interceptors/token.interceptor';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, ButtonModule],
    providers: [
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        AuthService,
        provideHttpClient(withInterceptors([TokenInterceptor])),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
