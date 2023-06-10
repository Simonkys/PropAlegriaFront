import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoServiciosExtraComponent } from './listado-servicios-extra.component';

describe('ListadoServiciosExtraComponent', () => {
  let component: ListadoServiciosExtraComponent;
  let fixture: ComponentFixture<ListadoServiciosExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoServiciosExtraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoServiciosExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
