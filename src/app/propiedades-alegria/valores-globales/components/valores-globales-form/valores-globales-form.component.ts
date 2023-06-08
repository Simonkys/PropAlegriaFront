import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';

import { ValoresGlobalesService } from 'src/app/propiedades-alegria/valores-globales/valores-globales.service';
import { UbicacionFormComponent } from '../../../componentes/ubicacion-form/ubicacion-form.component';
import { ValoresGlobales, ValoresGlobalesForm } from '../../valores-globales.model';

@Component({
  selector: 'app-valores-globales-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    KeyFilterModule,
    UbicacionFormComponent
  ],
  templateUrl: './valores-globales-form.component.html',
  styleUrls: ['./valores-globales-form.component.scss']
})
export class ValoresGlobalesFormComponent implements OnInit {

  @Input() valoresGlobales?: ValoresGlobales

  @Output() submitEvent = new EventEmitter<ValoresGlobalesForm>()
  @Output() cancelEvent = new EventEmitter()
  
  fb = inject(FormBuilder);
  valoresGlobalesService = inject(ValoresGlobalesService);

  form = this.fb.group({
    nombre: this.fb.nonNullable.control<string>('', [Validators.required, Validators.maxLength(50)]),
    valor: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.minLength(1), Validators.maxLength(15)])
  });

  ngOnInit(): void {
    if (this.valoresGlobales) {
      this.form.patchValue({
        nombre: this.valoresGlobales.nombre,
        valor: this.valoresGlobales.valor,
      })
    }
  }

  submit() {
    if (this.form.invalid) return;

    const values = this.form.getRawValue();
    const externo: ValoresGlobalesForm = {
      id: this.valoresGlobales?.id,
      nombre: values.nombre,
      valor: values.valor,
    }
    this.submitEvent.emit(externo)
  }

  cancelar() {
    this.cancelEvent.emit()
  }

}
