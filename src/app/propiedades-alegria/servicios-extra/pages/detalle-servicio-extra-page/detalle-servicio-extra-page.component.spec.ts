import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleServicioExtraPageComponent } from './detalle-servicio-extra-page.component';

describe('DetalleServicioExtraPageComponent', () => {
  let component: DetalleServicioExtraPageComponent;
  let fixture: ComponentFixture<DetalleServicioExtraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleServicioExtraPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleServicioExtraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
