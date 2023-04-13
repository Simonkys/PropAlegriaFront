import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    messages: Message[] = [];
    loading = false;

    form = this.fb.nonNullable.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    login() {
        if (this.form.invalid) return;
        this.loading = true;
        const { username, password } = this.form.getRawValue();
        this.authService
            .login(username, password)
            .pipe(
                finalize(() => {
                    this.loading = false;
                    this.form.reset();
                })
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['/'], { replaceUrl: true });
                },
                error: () => {
                    this.messages = [
                        {
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Credenciales inválidas',
                        },
                    ];
                },
            });
    }
}
