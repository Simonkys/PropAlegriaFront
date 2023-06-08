import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPagoArriendoFormComponent } from './registrar-pago-arriendo-form.component';

describe('RegistrarPagoArriendoFormComponent', () => {
  let component: RegistrarPagoArriendoFormComponent;
  let fixture: ComponentFixture<RegistrarPagoArriendoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RegistrarPagoArriendoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPagoArriendoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
