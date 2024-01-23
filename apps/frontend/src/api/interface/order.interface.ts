export interface Order {
  id: string;
  message: string;
  created_user: string;
  created_date: Date;
  updated_user: string;
  updated_date: Date;
}

export interface OrderBody {
  message: string;
}

export interface PatientOrderBody {
  message: string;
  patientId: string;
}
