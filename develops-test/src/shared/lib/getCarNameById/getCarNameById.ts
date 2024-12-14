import { IMake } from '@/shared/api/getMakes/getMakes';

export const getCarNameById = (makes: IMake[], id: string) => {
  const make = makes.find((make: IMake) => make.value == id);
  return make && make.label;
};
