import { TestBed } from '@angular/core/testing';

import { ListaChamadosService } from './lista-chamados.service';

describe('ListaChamadosService', () => {
  let service: ListaChamadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaChamadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
