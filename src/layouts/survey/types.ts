/**********************************
 * Interfaces and Types
 **********************************/

export interface Tenant {
  _id: string;
  uid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  emergency_contact: string;
  property_name: string;
  floor_label: string;
  room_number: string;

  // You can add more fields if needed
}

export interface CommonProps<T = any> {
  lastElementRef?: (node?: Element | null) => void;
  loading?: boolean;
  buttonLoading?: boolean;
  initialLoading?: boolean;
  hasMore?: boolean;
  error?: string | null;
  total?: number;
  page?: number;
  surveyData?: T[]; // ✅ Generic type instead of any[]
  filterParams?: {
    page?: number; // ✅ number instead of string
  };
}
