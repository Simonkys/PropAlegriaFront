import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoServiciosExtraPageComponent } from './listado-servicios-extra-page.component';

describe('ListadoServiciosExtraPageComponent', () => {
  let component: ListadoServiciosExtraPageComponent;
  let fixture: ComponentFixture<ListadoServiciosExtraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoServiciosExtraPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoServiciosExtraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
