import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoArrendatariosPageComponent } from './listado-arrendatarios-page.component';

describe('ListadoArrendatariosPageComponent', () => {
  let component: ListadoArrendatariosPageComponent;
  let fixture: ComponentFixture<ListadoArrendatariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoArrendatariosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoArrendatariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
