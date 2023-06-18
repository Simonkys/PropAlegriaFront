import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPropietariosComponent } from './selector-propietarios.component';

describe('SelectorPropietariosComponent', () => {
  let component: SelectorPropietariosComponent;
  let fixture: ComponentFixture<SelectorPropietariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SelectorPropietariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorPropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
