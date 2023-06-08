import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresGlobalesComponent } from './valores-globales.component';

describe('ValoresGlobalesComponent', () => {
  let component: ValoresGlobalesComponent;
  let fixture: ComponentFixture<ValoresGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ValoresGlobalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValoresGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
