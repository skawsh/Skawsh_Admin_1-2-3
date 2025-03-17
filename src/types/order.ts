
import { OrderStatus, WashType } from '@/components/orders/types';

export interface AssignedOrder {
  id: string;
  orderId: string;
  customer?: string;
  customerAddress?: string;
  studio?: string;
  studioAddress?: string;
  date?: string;
  status?: string;
  originalStatus?: OrderStatus;
  pickedUp?: boolean;
  pickedUpTime?: string | null;
  dropped?: boolean;
  droppedTime?: string | null;
  showTripStatus?: boolean;
  washType?: WashType | string;
  reported?: boolean;
}
