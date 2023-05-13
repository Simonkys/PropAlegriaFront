import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPropiedadComponent } from './listado-propiedad.component';

describe('ListadoPropiedadComponent', () => {
  let component: ListadoPropiedadComponent;
  let fixture: ComponentFixture<ListadoPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoPropiedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
