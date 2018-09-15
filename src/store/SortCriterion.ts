import { Dictionary } from '../util';

export type SortCriterion = 'firstName' | 'lastName' | 'class' | 'status';

export const sortCriteria: SortCriterion[] = [
  'firstName',
  'lastName',
  'class',
  'status',
];

export const criteriaNames: Dictionary<string, SortCriterion> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  class: 'Class',
  status: 'Status',
};

export default SortCriterion;
