import { Pictures } from './pictures';
import { User } from './user';

export interface Animal {
  id: number;
  name: string;
  date_of_birth: string;
  sexe: string;
  race: string;
  short_story: string;
  long_story: string;
  health: string;
  species_id: number;
  creator_id: number;
  created_at: string;
  updated_at: any;
  creator: User;
  species: string;
  pictures: Pictures[];
}
