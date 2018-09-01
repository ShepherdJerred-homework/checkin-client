import { combineReducers } from 'redux';
import { Dictionary } from '../util';
import Action from './Action';
import Class from './Class';
import { State } from './State';

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

const reducer = combineReducers<State, Action>({
  classes,
});

export default reducer;
