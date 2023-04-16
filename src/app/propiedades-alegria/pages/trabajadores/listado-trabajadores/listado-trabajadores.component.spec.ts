import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTrabajadoresComponent } from './listado-trabajadores.component';

describe('ListadoTrabajadoresComponent', () => {
  let component: ListadoTrabajadoresComponent;
  let fixture: ComponentFixture<ListadoTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoTrabajadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
