import Student from '../store/Student';

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
  status: string;
}

export function setStudentStatus(studentId: string, status: string): SetStudentStatus {
    return {
      type: 'SetStudentStatus',
      studentId,
      status,
    };
}

export type Message = RequestLoadStudents | SetStudentStatus;

export default Message;
