import { Animal } from './animal';
import { Pictures } from './pictures';
import { UserAnimal } from './userAnimals';
export interface User {
  id: number;
  type_user: string;
  name: string;
  email: string;
  password: string;
  country: string;
  zip: number;
  city: string;
  longitude: string;
  latitude: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  created_at: string;
  updated_at: string;
  userAnimals: UserAnimal[];
  pictures: Pictures[];
  fosterlingProfiles: FosterlingProfile[];
  fosterlingRequests: any[];
  createdAnimals: Animal[];
}
