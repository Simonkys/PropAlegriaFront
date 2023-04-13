import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-perfil',
    standalone: true,
    imports: [CommonModule, InputTextModule],
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
    userService = inject(UserService);

    setPassword() {
        this.userService.setPassword('', '', '');
    }
}
