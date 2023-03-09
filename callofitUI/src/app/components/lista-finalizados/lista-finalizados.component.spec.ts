import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFinalizadosComponent } from './lista-finalizados.component';

describe('ListaFinalizadosComponent', () => {
  let component: ListaFinalizadosComponent;
  let fixture: ComponentFixture<ListaFinalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFinalizadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
