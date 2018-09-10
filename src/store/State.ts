import { Dictionary } from '../util';
import Alert from './Alert';
import Class from './Class';
import SortCriterion from './SortCriterion';
import Student from './Student';

export type MenuState = 'visible' | 'hidden';

export interface State {
  alerts: Alert[];
  classes: Dictionary<Class>;
  students: Dictionary<Student>;
  studentList: string[];
  sortCriteria: SortCriterion[];
  menuState: MenuState;
}

export default State;
