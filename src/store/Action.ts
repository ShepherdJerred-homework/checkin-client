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

export interface LoadStudents {
  type: 'LoadStudents';
  students: Student[];
}

export function loadStudents(students: Student[]): LoadStudents {
  return {
    type: 'LoadStudents',
    students,
  }
}

export type Action = LoadClasses | LoadStudents;

export default Action;
