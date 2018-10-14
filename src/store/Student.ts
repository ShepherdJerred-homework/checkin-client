import { ClassTag } from './Class';

export type Status = 'absent' | 'present' | 'ready';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: ClassTag;
  status: Status;
  statusLoading?: boolean;
}

export interface StudentEdit {
  id?: string;
  firstName: string;
  lastName: string;
  class: ClassTag;
}

export default Student;
