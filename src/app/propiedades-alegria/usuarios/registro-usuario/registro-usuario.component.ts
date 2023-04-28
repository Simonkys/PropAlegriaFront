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

import { TipoTrabajador, TipoTrabajadorEnum, Trabajador,
} from '../../trabajadores/trabajador.model';
import { UsuarioService } from '../usuario.service';

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

    trabajadores$ = this.trabajadorService
        .getTrabajadores()
        .pipe(
            map((trabajadores) =>
                trabajadores.filter(
                    (t) =>
                        ( t.tipo_trab === TipoTrabajadorEnum.EJECUTIVO_VENTAS ||
                        t.tipo_trab === TipoTrabajadorEnum.GERENTE ||
                        t.tipo_trab === TipoTrabajadorEnum.SECRETARIA_ADMIN ) && !t.usuario_id
                )
            )
        );

    trabajadorSeleccionado: Trabajador | null = null;
    tipoTrabajador?: TipoTrabajador;

    permisos: {name: string, value: number, help: string}[] = [
        { name: 'Super usuario', value: 1, help: '* Usuario con acceso a todas las funcionalidades.'},
        { name: 'Staff', value: 2, help: '* Usuario con acceso a todas las funcionalidades con excepción de la gestión de cuentas de usuarios.'},
        { name: 'Simple', value: 3, help: '* Usuario con acceso solo a funciones de caja chica.'},
    ]


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
                Validators.pattern(
                    /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,15}/
                ),
            ]
        }),
        permisos: new FormControl<number>(3, {nonNullable: true}),
    });

    permisosHelpText$ = this.form.get('permisos')?.valueChanges.pipe(startWith(3), map(val => {
        return this.permisos.find(p => p.value === val)!.help
    }))
    

    seleccionTrabajador(trabajador: Trabajador) {
        this.trabajadorSeleccionado = trabajador;
        this.trabajadorService.getTipoDeTrabajadores().subscribe((tipos) => {
            this.tipoTrabajador = tipos.find(
                (t) => t.id === trabajador.tipo_trab
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
                .crearUsuario({ email: email!, password: password!, username: username!, ...this.permisosResolver(permisos)}).pipe(
                    switchMap((user) => {
                        return this.trabajadorService.pathValue({
                            id: this.trabajadorSeleccionado?.id,
                            usuario_id: user.id
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

    permisosResolver(val: number): {is_staff: boolean, is_superuser: boolean} {
        if(val === 1) {
            return {is_staff: true, is_superuser: true}
        }
        if(val === 2){
            return {is_staff: true, is_superuser: false}
        } else {
            return {is_staff: false, is_superuser: false}
        }
    }

    cancelar() {
        this.router.navigate(['usuarios/listado']);
    }
}
