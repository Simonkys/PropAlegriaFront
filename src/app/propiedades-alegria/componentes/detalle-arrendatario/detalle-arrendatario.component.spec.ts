import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleArrendatarioComponent } from './detalle-arrendatario.component';

describe('DetalleArrendatarioComponent', () => {
  let component: DetalleArrendatarioComponent;
  let fixture: ComponentFixture<DetalleArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetalleArrendatarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
