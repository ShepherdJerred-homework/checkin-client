import Student, { Status } from '../store/Student';

export interface RequestLoadStudents {
  type: 'RequestLoadStudents';
}

export function requestLoadStudents(): RequestLoadStudents {
  return {
    type: 'RequestLoadStudents',
  };
}

export interface SetStudentStatus {
  type: 'SetStudentStatus';
  studentId: string;
  status: Status;
}

export function setStudentStatus(studentId: string, status: Status): SetStudentStatus {
    return {
      type: 'SetStudentStatus',
      studentId,
      status,
    };
}

export type Message = RequestLoadStudents | SetStudentStatus;

export default Message;
