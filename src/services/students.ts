import * as jquery from 'jquery';
import { studentApiUrl } from '../config';
import * as logger from '../services/logger';
import Student, { StudentEdit } from '../store/Student';

export function getStudents(): PromiseLike<Student[]> {
  return jquery.get(studentApiUrl);
}

export async function saveStudent(student: StudentEdit) {
  try {
    let response: JQuery.jqXHR<Student>;
    if (student.id) {
      response = jquery.ajax({
        type: 'PATCH',
        url: studentApiUrl + student.id,
        data: JSON.stringify({ firstName: student.firstName, lastName: student.lastName, class: student.class }),
        contentType: 'application/json',
      });
    }
    else {
      response = await jquery.ajax({
        type: 'POST',
        url: studentApiUrl,
        data: JSON.stringify(student),
        contentType: 'application/json',
      });
    }
    return response.responseJSON;
  }
  catch (response) {
    logger.error(response.responseJSON);
    throw response.responseJSON;
  }
}

export function deleteStudent(studentId: string) {
  try {
    const response = jquery.ajax({
      type: 'DELETE',
      url: studentApiUrl + studentId,
    });
    return response.responseJSON;
  }
  catch (response) {
    logger.error(response.responseJSON);
    throw response.responseJSON;
  }
}
