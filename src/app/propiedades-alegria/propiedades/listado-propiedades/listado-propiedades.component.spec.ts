import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPropiedadesComponent } from './listado-propiedades.component';

describe('ListadoPropiedadesComponent', () => {
  let component: ListadoPropiedadesComponent;
  let fixture: ComponentFixture<ListadoPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoPropiedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
