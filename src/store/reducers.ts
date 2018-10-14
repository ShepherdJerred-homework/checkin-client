import { combineReducers } from 'redux';
import { Dictionary } from '../util';
import Action from './Action';
import Alert from './Alert';
import Class from './Class';
import SortCriterion from './SortCriterion';
import State, { MenuState } from './State';
import Student from './Student';

let count = 0;

function alerts(state: Alert[] = [ ], action: Action): Alert[] {
  switch (action.type) {
    case 'AddAlert':
      const alert = state.find(a => a.tag === action.tag);
      if (alert) {
        return state.map(a => a.tag === alert.tag ? {
          id: a.id,
          type: a.type,
          message: a.message,
          tag: a.tag,
          count: a.count + 1,
        } : a);
      }
      else {
        return [ {
          id: ++count,
          type: action.alertType,
          message: action.message,
          tag: action.tag,
          count: 1,
        }, ...state ];
      }
    case 'RemoveAlert':
      return state.filter(a => a.id !== action.alertId);
    default:
      return state;
  }
}

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

function students(state: Dictionary<Student> = { }, action: Action): Dictionary<Student> {
  switch (action.type) {
    case 'ServerLoadStudents':
    {
      const newState: Dictionary<Student> = { };
      for (const s of action.students) {
        newState[s.id] = s;
      }
      return newState;
    }
    case 'ServerAddStudent':
    case 'ServerUpdateStudent':
    {
      return { ...state, [action.student.id]: action.student };
    }
    case 'SetStudentStatusLoading':
    {
      const student = state[action.studentId];
      if (student && student.statusLoading !== action.statusLoading) {
        const updatedStudent = { ...student, statusLoading: action.statusLoading };
        return { ...state, [action.studentId]: updatedStudent };
      }
      else {
        return state;
      }
    }
    default:
      return state;
  }
}

function studentList(state: string[] = [ ], action: Action): string[] {
  switch (action.type) {
    case 'ServerLoadStudents':
      return action.students.map(s => s.id);
    case 'ServerAddStudent':
      return state.concat([ action.student.id ]);
    case 'ServerRemoveStudent':
      return state.filter(id => id !== action.studentId);
    default:
     return state;
  }
}

const reducer = combineReducers<State, Action>({
  alerts,
  classes,
  students,
  studentList,
});

export default reducer;
