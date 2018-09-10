import { Dictionary } from '../util';

export type ClassTag = 'threes' | 'fours' | 'kinder' | 'all';

export const classTags: ClassTag[] = [
  'threes',
  'fours',
  'kinder',
  'all',
];

export const classNames: Dictionary<string, ClassTag> = {
  threes: 'Three Year Olds',
  fours: 'Four Year Olds',
  kinder: 'Kindergarten',
  all: 'All Classes',
};
