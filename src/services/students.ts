import * as jquery from 'jquery';
import { studentApiUrl } from '../config';
import Student from '../store/Student';

export function getStudents(): PromiseLike<Student[]> {
  return jquery.get(studentApiUrl);
}
