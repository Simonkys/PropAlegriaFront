import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPropietariosComponent } from './listado-propietarios.component';

describe('ListadoPropietariosComponent', () => {
  let component: ListadoPropietariosComponent;
  let fixture: ComponentFixture<ListadoPropietariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoPropietariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
