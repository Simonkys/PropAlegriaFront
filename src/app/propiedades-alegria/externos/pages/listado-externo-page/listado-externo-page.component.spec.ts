import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoExternoPageComponent } from './listado-externo-page.component';

describe('ListadoExternoPageComponent', () => {
  let component: ListadoExternoPageComponent;
  let fixture: ComponentFixture<ListadoExternoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoExternoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoExternoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
