import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleExternoComponent } from './detalle-externo.component';

describe('DetalleExternoComponent', () => {
  let component: DetalleExternoComponent;
  let fixture: ComponentFixture<DetalleExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleExternoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
