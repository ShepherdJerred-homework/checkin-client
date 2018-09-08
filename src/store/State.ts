import { Dictionary } from '../util';
import Alert from './Alert';
import Class from './Class';
import SortCriterion from './SortCriterion';
import Student from './Student';

export interface State {
  alerts: Alert[];
  classes: Dictionary<Class>;
  students: Dictionary<Student>;
  sortCriteria: SortCriterion[];
}

export default State;
