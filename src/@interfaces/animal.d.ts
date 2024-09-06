export interface Animal {
  id: string;
  name: string;
  race: string;
  sexe: string;
  date_of_birth: string;
  short_story: string;
  long_story: string;
  health: string;
  creator: Creator;
}

interface Creator {
  name: string;
  address: string;
  city: string;
  country: string;
  website: string;
}
