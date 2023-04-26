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

import { TrabajadorService } from '../../trabajadores/trabajador.service';
import { map, switchMap, tap } from 'rxjs';
import { TipoUsuario } from '../../core/auth.model';
import {
    TipoTrabajador,
    Trabajador,
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
    ],
    templateUrl: './registro-usuario.component.html',
    styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent {
    trabajadorService = inject(TrabajadorService);
    usuarioService = inject(UsuarioService);
    router = inject(Router);

    trabajadores$ = this.trabajadorService
        .getTrabajadores()
        .pipe(
            map((trabajadores) =>
                trabajadores.filter(
                    (t) =>
                        ( t.tipo_trab === TipoUsuario.EJECUTIVO_VENTAS ||
                        t.tipo_trab === TipoUsuario.GERENTE ||
                        t.tipo_trab === TipoUsuario.SECRETARIA_ADMIN ) && !t.usuario_id
                )
            )
        );

    trabajadorSeleccionado: Trabajador | null = null;
    tipoTrabajador?: TipoTrabajador;

    form = new FormGroup({
        username: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(15),
        ]),
        password: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
            Validators.pattern(
                /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,15}/
            ),
        ]),
    });

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

    crearCuenta() {
        if (
            this.form.invalid ||
            !this.trabajadorSeleccionado ||
            !this.tipoTrabajador
        ) {
          return;
        }

        const { email } = this.trabajadorSeleccionado!;
        const { username, password } = this.form.getRawValue()!;

        this.usuarioService
            .createUser({
                email: email!,
                password: password!,
                username: username!,
            })
            .subscribe({
              next: () => {
                this.router.navigate(['usuarios/listado']);
                // ACTUALIZAR USUARIO EN TRABAJADOR
              },
              error: () => {}
            });
    }

    cancelar() {
        this.router.navigate(['usuarios/listado']);
    }
}
