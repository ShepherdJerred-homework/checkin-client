import { Dictionary } from '../util';

export type ExactClassTag = 'threes' | 'fours' | 'kinder';

export type ClassTag = ExactClassTag | 'all';

export const classTags: ClassTag[] = [
  'threes',
  'fours',
  'kinder',
  'all',
];

export const classNames: Dictionary<string, ClassTag> = {
  threes: 'Three Year Olds',
  fours: 'Four Year Olds',
  kinder: 'Pre-K and Kindergarten',
  all: 'All Classes',
};

export interface Class {
  id: string;
  tag: ExactClassTag;
  name: string;
  color: string;
}

export default Class;
