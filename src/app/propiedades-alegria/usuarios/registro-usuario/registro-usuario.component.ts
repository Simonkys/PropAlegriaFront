import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { map, startWith } from 'rxjs';

import { UsuarioService } from '../usuario.service';
import { PermisoEnum } from '../usuario.model';
import { PermisoService } from '../../core/services/permiso.service';

@Component({
    selector: 'app-registro-usuario',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        KeyFilterModule,
        SelectButtonModule,
        ConfirmPopupModule
       ],
       providers: [ConfirmationService],
    templateUrl: './registro-usuario.component.html',
    styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent {

    usuarioService = inject(UsuarioService);
    location = inject(Location);
    confimService = inject(ConfirmationService);
    permisoService = inject(PermisoService)


    permisos = this.permisoService.permisiosOption


    form = new FormGroup({
        email: new FormControl<string>("", [Validators.required, Validators.email]),
        username: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15),
            ]
        } ),
        password: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15),
                Validators.pattern(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,15}/),
            ]
        }),
        permisos: new FormControl<PermisoEnum>(PermisoEnum.Simple, {nonNullable: true}),
    });

    permisosHelpText$ = this.form.get('permisos')?.valueChanges.pipe(startWith(PermisoEnum.Simple), map(val => {
        return this.permisoService.permisiosOption.find(p => p.permValue === val)!.permHelp
    }))
    

    crearCuenta(event: Event) {
        if ( this.form.invalid ) { return; }

        this.confimService.confirm({
            target: event.target || new EventTarget(),
            message: `¿Estas segur@ de la creación de la cuenta?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                const { email, username, password, permisos } = this.form.getRawValue()!;

                this.usuarioService
                .crearUsuario(
                    { 
                        email: email!, 
                        password: password!, 
                        username: username!, 
                        ...this.permisoService.mapToDjango(permisos)
                    }
                )
                .subscribe(() => this.volver());
            },
        });
    }

    volver() {
        this.location.back();
    }
}
