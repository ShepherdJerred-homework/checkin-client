import { Dictionary } from '../util';
import Class from './Class';
import SortCriterion from './SortCriterion';
import Student from './Student';

export interface State {
  classes: Dictionary<Class>;
  students: Dictionary<Student>;
  sortCriteria: SortCriterion[];
}

export default State;
