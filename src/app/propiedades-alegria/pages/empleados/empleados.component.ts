import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-empleados',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ToolbarModule,
        ButtonModule,
        TableModule,
    ],
    templateUrl: './empleados.component.html',
    styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent {}
