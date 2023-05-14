import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoArrendatarioComponent } from './listado-arrendatario.component';

describe('ListadoArrendatarioComponent', () => {
  let component: ListadoArrendatarioComponent;
  let fixture: ComponentFixture<ListadoArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ListadoArrendatarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
