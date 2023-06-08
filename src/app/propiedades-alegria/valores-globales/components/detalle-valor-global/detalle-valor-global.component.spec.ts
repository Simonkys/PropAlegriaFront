import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleValorGlobalComponent } from './detalle-valor-global.component';

describe('DetalleValorGlobalComponent', () => {
  let component: DetalleValorGlobalComponent;
  let fixture: ComponentFixture<DetalleValorGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleValorGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleValorGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
