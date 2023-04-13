import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Message } from 'primeng/api';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        MessagesModule,
        PasswordModule,
    ],
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
    authService = inject(AuthService);
    fb = inject(FormBuilder);
    router = inject(Router);

    messages: Message[] = [];
    loading = false;

    form = this.fb.nonNullable.group({
        username: ['admin', [Validators.required]],
        password: ['admin', [Validators.required]],
    });
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
