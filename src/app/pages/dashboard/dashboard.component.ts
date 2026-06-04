import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Tableau de bord</h1>

    @if (loading) {
      <p>Chargement...</p>
    } @else {
      <p>
        Alertes critiques :
        <span class="badge-critical">{{ criticalCount }}</span>
      </p>

      @if (alerts.length === 0) {
        <p>Aucune alerte.</p>
      } @else {
        <ul>
          @for (alert of alerts; track alert.id) {
            <li>
              <strong>{{ alert.medicationName }}</strong> — {{ alert.message }}
              ({{ alert.level }})
            </li>
          }
        </ul>
      }
    }
  `
})
export class DashboardComponent implements OnInit {
  alerts: Alert[] = [];
  criticalCount = 0;
  loading = true;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe({
      next: (alerts) => {
        this.alerts = alerts;
        this.criticalCount = alerts.filter(
          (a) => a.level === 'critical'
        ).length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
