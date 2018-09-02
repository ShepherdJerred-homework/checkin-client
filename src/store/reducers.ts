import { combineReducers } from 'redux';
import { Dictionary } from '../util';
import Action from './Action';
import Class from './Class';
import SortCriterion from './SortCriterion';
import State from './State';
import Student from './Student';

function classes(state: Dictionary<Class> = { }, action: Action): Dictionary<Class> {
  switch (action.type) {
    case 'LoadClasses':
      const dictionary: Dictionary<Class> = { };
      for (const clas of action.classes) {
        dictionary[clas.tag] = clas;
      }
      return dictionary;
    default:
      return state;
  }
}

function students(state: Student[] = [ ], action: Action): Student[] {
  switch (action.type) {
    case 'LoadStudents':
      return action.students;
    default:
      return state;
  }
}

function sortCriteria(
  state: SortCriterion[] = [ 'status', 'firstName', 'lastName', 'class' ],
  action: Action
): SortCriterion[] {
  return state;
}

const reducer = combineReducers<State, Action>({
  classes,
  students,
  sortCriteria,
});

export default reducer;
