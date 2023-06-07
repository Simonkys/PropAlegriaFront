import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPropiedadesCodigoComponent } from './listado-propiedades-codigo.component';

describe('ListadoPropiedadesCodigoComponent', () => {
  let component: ListadoPropiedadesCodigoComponent;
  let fixture: ComponentFixture<ListadoPropiedadesCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoPropiedadesCodigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPropiedadesCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
