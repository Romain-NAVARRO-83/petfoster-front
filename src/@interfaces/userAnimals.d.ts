import { Animal } from './animal';
export interface UserAnimal {
  id: number;
  animals_id: number;
  users_id: number;
  date_start: string;
  date_end: string | null; // Since it can be null
  animal: Animal;
}
