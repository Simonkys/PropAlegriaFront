import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleExternoPageComponent } from './detalle-externo-page.component';

describe('DetalleExternoPageComponent', () => {
  let component: DetalleExternoPageComponent;
  let fixture: ComponentFixture<DetalleExternoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleExternoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleExternoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
