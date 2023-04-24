import { TestBed } from '@angular/core/testing';

import { EditarSensorService } from './editar-sensor.service';

describe('EditarSensorService', () => {
  let service: EditarSensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarSensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
