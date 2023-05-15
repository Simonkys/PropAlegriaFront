import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTrabajadoresPageComponent } from './listado-trabajadores-page.component';

describe('ListadoTrabajadoresPageComponent', () => {
  let component: ListadoTrabajadoresPageComponent;
  let fixture: ComponentFixture<ListadoTrabajadoresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoTrabajadoresPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTrabajadoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
