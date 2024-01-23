import type { Order } from "@/src/api/interface/order.interface";

export interface Patient {
  id: string;
  name: string;
  created_user: string;
  created_date: Date;
  updated_user: string;
  updated_date: Date;
}

export interface PatientBody {
  name: string;
}

export interface PatientWithOrders {
  id: string;
  name: string;
  created_user: string;
  created_date: Date;
  updated_user: string;
  updated_date: Date;
  orders: Order[];
}
