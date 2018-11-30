import { AlertType } from './Alert';
import Class, { ClassTag } from './Class';
import { FilterSet } from './Filter';
import SortCriterion from './SortCriterion';
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
  tag: string;
}

export function addAlert(type: AlertType, tag: string, message: string): AddAlert {
  return {
    type: 'AddAlert',
    alertType: type,
    message,
    tag,
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

export interface SetStudentStatusLoading {
  type: 'SetStudentStatusLoading';
  studentId: string;
  statusLoading: boolean;
}

export function setStudentStatusLoading(studentId: string, statusLoading: boolean): SetStudentStatusLoading {
  return {
    type: 'SetStudentStatusLoading',
    studentId,
    statusLoading,
  };
}

export interface SetSortOrder {
  type: 'SetSortOrder';
  order: SortCriterion[];
}

export function setSortOrder(order: SortCriterion[]): SetSortOrder {
  return {
    type: 'SetSortOrder',
    order,
  };
}

export interface SetFilters {
  type: 'SetFilters';
  filters: FilterSet;
}

export function setFilters(filters: FilterSet): SetFilters {
  return {
    type: 'SetFilters',
    filters,
  };
}

export interface ServerLoadStudents {
  type: 'ServerLoadStudents';
  students: Student[];
}

export interface ServerUpdateStudent {
  type: 'ServerUpdateStudent';
  student: Student;
}

export interface ServerAddStudent {
  type: 'ServerAddStudent';
  student: Student;
}

export interface ServerRemoveStudent {
  type: 'ServerRemoveStudent';
  studentId: string;
}

export type Action =
  LoadClasses |
  AddAlert |
  RemoveAlert |
  SetStudentStatusLoading |
  SetSortOrder |
  SetFilters |
  ServerLoadStudents |
  ServerUpdateStudent |
  ServerAddStudent |
  ServerRemoveStudent;

export default Action;
