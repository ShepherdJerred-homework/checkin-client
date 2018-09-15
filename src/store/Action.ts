import { Dictionary } from '../util';
import { AlertType } from './Alert';
import Class from './Class';
import Student from './Student';

export interface LoadClasses {
  type: 'LoadClasses';
  classes: Class[];
}

export function loadClasses(classes: Class[]): LoadClasses {
  return {
    type: 'LoadClasses',
    classes,
  };
}

export interface AddAlert {
  type: 'AddAlert';
  alertType: AlertType;
  message: string;
}

export function addAlert(type: AlertType, message: string): AddAlert {
  return {
    type: 'AddAlert',
    alertType: type,
    message,
  };
}

export interface RemoveAlert {
  type: 'RemoveAlert';
  alertId: number;
}

export function removeAlert(alertId: number): RemoveAlert {
  return {
    type: 'RemoveAlert',
    alertId,
  };
}

export interface RemoveHighlight {
  type: 'RemoveHighlight';
  studentId: string;
  highlightId: number;
}

export function removeHighlight(studentId: string, highlightId: number): RemoveHighlight {
  return {
    type: 'RemoveHighlight',
    studentId,
    highlightId,
  };
}

export interface ServerLoadStudents {
  type: 'ServerLoadStudents';
  students: Student[];
}

export interface ServerUpdateStudentStatus {
  type: 'ServerUpdateStudentStatus';
  studentId: string;
  status: string;
  highlightId: number;
}

export type Action =
  LoadClasses |
  AddAlert |
  RemoveAlert |
  RemoveHighlight |
  ServerLoadStudents |
  ServerUpdateStudentStatus;

export default Action;
