import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GstAccountingInterface {
  id?: string;
  gst_number: string;
  accounting_data: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface GstAccountingGetQueryInterface extends GetQueryInterface {
  id?: string;
  gst_number?: string;
  accounting_data?: string;
  user_id?: string;
}
