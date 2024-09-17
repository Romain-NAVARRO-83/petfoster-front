import { User } from './user';
import { Animal } from './animal';

export interface FRequest {
  id: number;
  request_status: string;
  content_request: string;
  animals_id: number;
  users_id: number;
  created_at: string;
  updated_at: any;
  animal: Animal;
  user: User;
}
