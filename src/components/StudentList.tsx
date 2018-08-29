import * as React from 'react';
import Student from '../data/Student';

export interface StudentListProps {
  students: Student[];
}

export function StudentList(props: StudentListProps) {
  return (
    <section>
    {
      props.students.map(student =>
        <div key={student.tag}>
          {student.firstName} {student.lastName}
        </div>
      )
    }
    </section>
  );
}

export default StudentList;
