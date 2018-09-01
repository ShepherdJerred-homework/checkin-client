import * as jquery from 'jquery';
import { classApiUrl } from '../config';
import Class from '../store/Class';

export function getClasses(): PromiseLike<Class[]> {
  return jquery.get(classApiUrl)
}
