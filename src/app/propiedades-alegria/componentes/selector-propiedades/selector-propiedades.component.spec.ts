import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPropiedadesComponent } from './selector-propiedades.component';

describe('SelectorPropiedadesComponent', () => {
  let component: SelectorPropiedadesComponent;
  let fixture: ComponentFixture<SelectorPropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SelectorPropiedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
