import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ErpProcessInterface {
  id?: string;
  process_name: string;
  automation_status: boolean;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ErpProcessGetQueryInterface extends GetQueryInterface {
  id?: string;
  process_name?: string;
  user_id?: string;
}
