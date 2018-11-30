import * as Redux from 'redux';
import App from '../App';
import { Dictionary } from '../util';
import Alert from './Alert';
import Class from './Class';
import { FilterSet } from './Filter';
import reducer from './reducers';
import SortCriterion from './SortCriterion';
import Student from './Student';

export type MenuState = 'visible' | 'hidden';

export interface State {
  alerts: Alert[];
  classes: Dictionary<Class>;
  students: Dictionary<Student>;
  studentList: string[];
  sortOrder: SortCriterion[];
  filters: FilterSet;
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
      sortOrder: state.sortOrder,
      filters: state.filters,
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
