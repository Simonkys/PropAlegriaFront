import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCuentaBancariaComponent } from './listado-cuenta-bancaria.component';

describe('ListadoCuentaBancariaComponent', () => {
  let component: ListadoCuentaBancariaComponent;
  let fixture: ComponentFixture<ListadoCuentaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoCuentaBancariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCuentaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
