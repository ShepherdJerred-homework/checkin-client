import Class from './Class';
import { Dictionary } from '../util';

export interface State {
  classes: Dictionary<Class>;
}

export default State;
