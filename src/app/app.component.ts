import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './propiedades-alegria/core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

    authService = inject(AuthService);
    router = inject(Router);

    unsub?: Subscription

    constructor(
        private primengConfig: PrimeNGConfig,
    ) {}
   

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.unsub = this.authService.user$.subscribe(user => {
            if(user) {
                if(user.usuario.is_superuser) {
                    this.router.navigate(['dashboard'], {replaceUrl: true});
                } else if (user.usuario.is_staff) {
                    this.router.navigate(['dashboard'], {replaceUrl: true});
                } else {
                    this.router.navigate(['empty'], {replaceUrl: true});
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.unsub?.unsubscribe()
    }


}
