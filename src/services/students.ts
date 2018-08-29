import * as jquery from 'jquery';
import App from '../App';
import { studentApiUrl } from '../config';
import Student from '../data/Student';

export function getStudents(): PromiseLike<Student[]> {
  // return new Promise((resolve, reject) => {
    return jquery.get(studentApiUrl);
  // });
}
