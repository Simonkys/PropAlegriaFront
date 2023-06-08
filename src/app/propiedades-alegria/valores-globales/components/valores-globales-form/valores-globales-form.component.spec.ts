import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresGlobalesFormComponent } from './valores-globales-form.component';

describe('ValoresGlobalesFormComponent', () => {
  let component: ValoresGlobalesFormComponent;
  let fixture: ComponentFixture<ValoresGlobalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ValoresGlobalesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValoresGlobalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
