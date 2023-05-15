import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { TrabajadorService } from '../../trabajadores/trabajador.service';
import { map, startWith, switchMap } from 'rxjs';

import { TipoTrabajador, TipoTrabajadorEnum, Trabajador} from '../../trabajadores/trabajador.model';
import { UsuarioService } from '../../core/services/usuario.service';
import { PermisoEnum } from '../../core/models/usuario.model';
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
        DropdownModule,
        SelectButtonModule,
        ConfirmPopupModule
       ],
       providers: [ConfirmationService],
    templateUrl: './registro-usuario.component.html',
    styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent {
    trabajadorService = inject(TrabajadorService);
    usuarioService = inject(UsuarioService);
    router = inject(Router);
    confimService = inject(ConfirmationService);
    permisoService = inject(PermisoService)

    trabajadores$ = this.trabajadorService
        .getTrabajadores()
        .pipe(
            map((trabajadores) =>
                trabajadores.filter(
                    (t) =>
                        ( t.tipo_trab.id === TipoTrabajadorEnum.EJECUTIVO_VENTAS ||
                        t.tipo_trab.id === TipoTrabajadorEnum.GERENTE ||
                        t.tipo_trab.id === TipoTrabajadorEnum.SECRETARIA_ADMIN ) && !t.usuario_id
                )
            )
        );

    trabajadorSeleccionado: Trabajador | null = null;
    tipoTrabajador?: TipoTrabajador;

    permisos = this.permisoService.permisiosOption


    form = new FormGroup({
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
    

    seleccionTrabajador(trabajador: Trabajador) {
        this.trabajadorSeleccionado = trabajador;
        this.trabajadorService.getTipoDeTrabajadores().subscribe((tipos) => {
            this.tipoTrabajador = tipos.find(
                (t) => t.id === trabajador.tipo_trab.id
            );
        });
        this.setDefaultFormValues(trabajador);
    }

    setDefaultFormValues(trabajador: Trabajador) {
        const emailPart = trabajador.email
            ? trabajador.email.split('@')
            : ['propalegria'];

        const rut = trabajador.rut_trab.replace(/[.-]/g, '');
        this.form.patchValue({
            username: emailPart[0],
            password:
                rut.split('').reverse().join('').substring(4) +
                '#' +
                trabajador.pri_ape_trab.charAt(0).toUpperCase() +
                trabajador.pri_ape_trab.substring(1, 4),
        });
    }

    crearCuenta(event: Event) {
        if (
            this.form.invalid ||
            !this.trabajadorSeleccionado ||
            !this.tipoTrabajador
        ) {
          return;
        }

        this.confimService.confirm({
            target: event.target || new EventTarget(),
            message: `¿Estas segur@ de la creación de la cuenta?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                const { email } = this.trabajadorSeleccionado!;
                const { username, password, permisos } = this.form.getRawValue()!;

                this.usuarioService
                .crearUsuario({ email: email!, password: password!, username: username!, ...this.permisoService.mapToDjango(permisos)}).pipe(
                    switchMap((user) => {
                        return this.trabajadorService.pathValue({
                            id: this.trabajadorSeleccionado?.id,
                            usuario: user.id
                        })
                    })
                )
                .subscribe({
                  next: (trabajador) => {
                    this.router.navigate(['usuarios/listado']);
                  },
                  error: () => {}
                });
            },
        });
    }
    cancelar() {
        this.router.navigate(['usuarios/listado']);
    }
}
