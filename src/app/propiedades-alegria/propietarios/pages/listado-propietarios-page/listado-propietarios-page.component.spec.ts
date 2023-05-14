import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPropietariosPageComponent } from './listado-propietarios-page.component';

describe('ListadoPropietariosPageComponent', () => {
  let component: ListadoPropietariosPageComponent;
  let fixture: ComponentFixture<ListadoPropietariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoPropietariosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPropietariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
