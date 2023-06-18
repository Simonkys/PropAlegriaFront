import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  styles: [''],
  template: `
<p-button 
    (click)="volver()"
    label="Volver" 
    icon="pi pi-arrow-left" 
    styleClass="p-button-sm p-button-outlined mb-3">
</p-button>

`,
})
export class BackButtonComponent {

  location = inject(Location)

  volver(){
    this.location.back();
  }
}
