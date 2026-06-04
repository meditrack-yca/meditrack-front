import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { MedicationService } from './medication.service';
import { environment } from '../../environments/environment';
import { Medication } from '../models/medication.model';

describe('MedicationService', () => {
  let service: MedicationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MedicationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MedicationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET medications from the API and map the response', () => {
    const mock: { data: Medication[] } = {
      data: [
        {
          id: '1',
          name: 'Doliprane',
          dci: 'Paracetamol',
          form: 'comprime',
          stock: 120,
          threshold: 30,
          expiresAt: '2027-01-01',
          price: 2.5
        }
      ]
    };

    let result: { data: Medication[] } | undefined;
    service.getMedications().subscribe((res) => (result = res));

    const req = httpMock.expectOne(`${environment.apiUrl}/medications`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);

    expect(result).toEqual(mock);
    expect(result?.data.length).toBe(1);
  });
});
