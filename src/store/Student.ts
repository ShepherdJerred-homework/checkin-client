import { ExactClassTag } from './Class';

export type Status = 'absent' | 'present' | 'ready';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: ExactClassTag;
  status: Status;
  statusLoading?: boolean;
}

export interface StudentEdit {
  id?: string;
  firstName: string;
  lastName: string;
  class: ExactClassTag;
}

export default Student;
