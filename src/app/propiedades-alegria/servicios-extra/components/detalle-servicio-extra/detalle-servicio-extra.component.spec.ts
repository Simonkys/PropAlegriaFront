import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleServicioExtraComponent } from './detalle-servicio-extra.component';

describe('DetalleServicioExtraComponent', () => {
  let component: DetalleServicioExtraComponent;
  let fixture: ComponentFixture<DetalleServicioExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleServicioExtraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleServicioExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
