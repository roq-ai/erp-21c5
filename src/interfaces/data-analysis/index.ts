import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DataAnalysisInterface {
  id?: string;
  analysis_data: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DataAnalysisGetQueryInterface extends GetQueryInterface {
  id?: string;
  analysis_data?: string;
  user_id?: string;
}
