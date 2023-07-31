import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EngagementInterface {
  id?: string;
  engagement_score: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface EngagementGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
