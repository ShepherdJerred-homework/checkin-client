import Class from './Class';
import SortCriterion from './SortCriterion';
import Student from './Student';
import { Dictionary } from '../util';

export interface State {
  classes: Dictionary<Class>;
  students: Student[];
  sortCriteria: SortCriterion[];
}

export default State;
