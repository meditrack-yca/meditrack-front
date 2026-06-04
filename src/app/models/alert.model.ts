export interface Alert {
  id: string;
  type: string;
  level: 'info' | 'warning' | 'critical';
  medicationId: string;
  medicationName: string;
  message: string;
  createdAt: string;
  acknowledged: boolean;
}
