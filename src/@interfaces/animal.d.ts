import { Pictures } from './pictures';
import { User } from './user';
import { Species } from './species';

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
  updated_at: string;
  animalOwners: AnimalOwner[];
  creator: User;
  species: Species;
  pictures: Pictures[];
}
interface AnimalOwner {
  id: number;
  animals_id: number;
  users_id: number;
  date_start: string;
  date_end?: string;
  created_at: string;
  updated_at: any;
  user: User;
}
