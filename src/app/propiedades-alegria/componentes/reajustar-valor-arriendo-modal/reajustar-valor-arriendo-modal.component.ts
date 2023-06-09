import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reajustar-valor-arriendo-modal',
  standalone: true,
  imports: [CommonModule, InputNumberModule, ButtonModule, DynamicDialogModule, ReactiveFormsModule],
  templateUrl: './reajustar-valor-arriendo-modal.component.html',
  styleUrls: ['./reajustar-valor-arriendo-modal.component.scss'],
  providers: [DialogService]
})
export class ReajustarValorArriendoModalComponent {


  valorReajuste = new FormControl<number | null>(
    null, 
    {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(999999999)]
    }
  );

  constructor(public ref: DynamicDialogRef) {}


  guardar() {
    if (this.valorReajuste.valid)  {
      this.ref.close(this.valorReajuste.getRawValue())
    }

  }


  cerrarModal() {
    this.ref.close();
  }

}
