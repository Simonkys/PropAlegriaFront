import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioArrendatarioComponent } from './formulario-arrendatario.component';

describe('FormularioArrendatarioComponent', () => {
  let component: FormularioArrendatarioComponent;
  let fixture: ComponentFixture<FormularioArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormularioArrendatarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
