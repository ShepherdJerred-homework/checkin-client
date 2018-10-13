import { ClassTag } from './Class';

export type Status = 'absent' | 'present' | 'ready';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: ClassTag;
  status: Status;
  highlightId?: number;
  statusLoading?: boolean;
}

export default Student;
