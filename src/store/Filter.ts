import { Dictionary } from '../util';
import { classNames, ExactClassTag } from './Class';

export type Filter = ExactClassTag | 'a_l' | 'm_z';

export type FilterSet = Partial<Dictionary<boolean, Filter>>;

export const filterNames: Dictionary<string, Filter> = {
  twos: classNames.twos,
  threes: classNames.threes,
  fours: classNames.fours,
  kinder: classNames.kinder,
  a_l: 'Names A – L',
  m_z: 'Names M – Z',
};

export const filterOrder: Filter[] = [
  'twos',
  'threes',
  'fours',
  'kinder',
  'a_l',
  'm_z',
];

export const allFiltersOn: FilterSet = {
  twos: true,
  threes: true,
  fours: true,
  kinder: true,
  a_l: true,
  m_z: true,
};

export function filtersEqual(a: FilterSet, b: FilterSet) {
  // tslint:disable:triple-equals
  return (
    a.twos == b.twos &&
    a.threes == b.threes &&
    a.fours == b.fours &&
    a.kinder == b.kinder &&
    a.a_l == b.a_l &&
    a.m_z == b.m_z
  );
}

Object.freeze(allFiltersOn);
