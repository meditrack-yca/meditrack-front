export interface Medication {
  id: string;
  name: string;
  dci: string;
  form: string;
  stock: number;
  threshold: number;
  expiresAt: string;
  price: number;
}
