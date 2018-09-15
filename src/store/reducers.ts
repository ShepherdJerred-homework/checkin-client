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
      return [ { id: ++count, type: action.alertType, message: action.message }, ...state ];
    case 'RemoveAlert':
      return state.filter(alert => alert.id !== action.alertId);
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
    case 'ServerUpdateStudentStatus':
    {
      const student = state[action.studentId];
      if (student) {
        const updatedStudent = { ...student, status: action.status, highlightId: action.highlightId };
        return { ...state, [action.studentId]: updatedStudent };
      }
      else {
        return state;
      }
    }
    case 'RemoveHighlight':
    {
      const student = state[action.studentId];
      if (student && student.highlightId === action.highlightId) {
        const updatedStudent = { ...student };
        delete updatedStudent.highlightId;
        return { ...state, [action.studentId]: updatedStudent };
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
