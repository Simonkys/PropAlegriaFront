import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPropiedadesPageComponent } from './listado-propiedades-page.component';

describe('ListadoPropiedadesPageComponent', () => {
  let component: ListadoPropiedadesPageComponent;
  let fixture: ComponentFixture<ListadoPropiedadesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoPropiedadesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPropiedadesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
