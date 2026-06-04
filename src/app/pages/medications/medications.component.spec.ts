import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { MedicationsComponent } from './medications.component';
import { environment } from '../../../environments/environment';

describe('MedicationsComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MedicationsComponent);
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environment.apiUrl}/medications`);
    req.flush({ data: [] });

    expect(fixture.componentInstance).toBeTruthy();
  });
});
