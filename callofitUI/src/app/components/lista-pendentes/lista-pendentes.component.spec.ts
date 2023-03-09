import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPendentesComponent } from './lista-pendentes.component';

describe('ListaPendentesComponent', () => {
  let component: ListaPendentesComponent;
  let fixture: ComponentFixture<ListaPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPendentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
