import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UbicacionFormComponent } from '../../ubicaciones/ubicacion-form/ubicacion-form.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';
import { PropietarioService } from '../../core/services/propietario.service';
import { PropietarioForm } from '../../core/models/propietario.model';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-propietario',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    UbicacionFormComponent, 
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    KeyFilterModule
  ],
  templateUrl: './registro-propietario.component.html',
  styleUrls: ['./registro-propietario.component.scss']
})
export class RegistroPropietarioComponent {
  
  fb = inject(FormBuilder)
  propietarioService = inject(PropietarioService)
  router = inject(Router)

  form = this.fb.group({
    rut_prop: this.fb.nonNullable.control<string>('',
      [
        Validators.required,
        Validators.pattern(/^(\d{1,2}(?:\.\d{1,3}){2}-[\dkK])$/),
      ],
    ),
    pri_nom_prop: this.fb.nonNullable.control<string>('', [Validators.required]),
    seg_nom_prop: this.fb.control<string>('', []),
    pri_ape_prop: this.fb.nonNullable.control<string>('', [Validators.required]),
    seg_ape_prop: this.fb.control<string>('', []),
    direccion_prop: this.fb.nonNullable.control<string>('', [Validators.required]),
    email_prop: this.fb.control<string>('', [Validators.required, Validators.email]),
    contacto_prop: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ],),
    comuna_id: this.fb.control<number | null>(null, [Validators.required]),
  })

  handleSelectedComuna(comunaId: number | null) {
    this.form.patchValue({ comuna_id: comunaId })
  }


  guardar() {
    if(this.form.invalid) return;
    const values = this.form.getRawValue();
    const propietario: PropietarioForm = {
      rut_prop: values.rut_prop,
      pri_nom_prop: values.pri_nom_prop,
      seg_nom_prop: values.seg_nom_prop,
      pri_ape_prop: values.pri_ape_prop,
      seg_ape_prop: values.seg_ape_prop,
      direccion_prop: values.direccion_prop,
      email_prop: values.email_prop!,
      contacto_prop: values.contacto_prop!,
      comuna_id: values.comuna_id!,
    }

    this.propietarioService.createPropietario(propietario).pipe(
      finalize(() => {})
    ).subscribe({
      next: (res) => {
          this.router.navigate(['propietarios/listado']);
      },
      error: (err) => {},
  })
    
  }


  cancelar() {
    this.router.navigate(['propietarios/listado']);
  }

}
