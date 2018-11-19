import * as Redux from 'redux';
import App from '../App';
import { Dictionary } from '../util';
import Alert from './Alert';
import Class, { ClassTag } from './Class';
import reducer from './reducers';
import SortCriterion from './SortCriterion';
import Student from './Student';

export type MenuState = 'visible' | 'hidden';

export interface State {
  alerts: Alert[];
  classes: Dictionary<Class>;
  students: Dictionary<Student>;
  studentList: string[];
  classTag: ClassTag;
  sortOrder: SortCriterion[];
}

function loadState(): Partial<State> {
  try {
    const checkinState = localStorage.getItem('checkinState');
    if (checkinState) {
      return JSON.parse(checkinState);
    }
  }
  catch (err) {
    App.logger.error(err);
  }

  return { };
}

function storeState(state: State) {
  try {
    localStorage.setItem('checkinState', JSON.stringify({
      classTag: state.classTag,
      sortOrder: state.sortOrder,
    }));
  }
  catch (err) {
    App.logger.error(err);
  }
}

export function createStore(): Redux.Store {
  const store = Redux.createStore(reducer, loadState());
  store.subscribe(() => {
    storeState(store.getState());
  });
  return store;
}

export default State;
