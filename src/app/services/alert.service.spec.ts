import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { AlertService } from './alert.service';
import { environment } from '../../environments/environment';
import { Alert } from '../models/alert.model';

describe('AlertService', () => {
  let service: AlertService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AlertService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET alerts from the API', () => {
    const mock: Alert[] = [
      {
        id: 'a1',
        type: 'stock',
        level: 'critical',
        medicationId: '1',
        medicationName: 'Doliprane',
        message: 'Stock bas',
        createdAt: '2026-01-01',
        acknowledged: false
      }
    ];

    let result: Alert[] | undefined;
    service.getAlerts().subscribe((res) => (result = res));

    const req = httpMock.expectOne(`${environment.apiUrl}/alerts`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);

    expect(result).toEqual(mock);
  });
});
