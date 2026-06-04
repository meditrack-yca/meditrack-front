import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Medication } from '../models/medication.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private readonly baseUrl = `${environment.apiUrl}/medications`;

  constructor(private http: HttpClient) {}

  getMedications(): Observable<{ data: Medication[] }> {
    return this.http.get<{ data: Medication[] }>(this.baseUrl);
  }

  getMedication(id: string): Observable<Medication> {
    return this.http.get<Medication>(`${this.baseUrl}/${id}`);
  }
}
