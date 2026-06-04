import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../models/medication.model';

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Catalogue</h1>

    @if (loading) {
      <p>Chargement...</p>
    } @else {
      @if (medications.length === 0) {
        <p>Aucun medicament.</p>
      } @else {
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>DCI</th>
              <th>Forme</th>
              <th>Stock</th>
              <th>Seuil</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            @for (med of medications; track med.id) {
              <tr>
                <td>{{ med.name }}</td>
                <td>{{ med.dci }}</td>
                <td>{{ med.form }}</td>
                <td>{{ med.stock }}</td>
                <td>{{ med.threshold }}</td>
                <td>{{ med.price | number: '1.2-2' }} €</td>
              </tr>
            }
          </tbody>
        </table>
      }
    }
  `
})
export class MedicationsComponent implements OnInit {
  medications: Medication[] = [];
  loading = true;

  constructor(private medicationService: MedicationService) {}

  ngOnInit(): void {
    this.medicationService.getMedications().subscribe({
      next: (res) => {
        this.medications = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
