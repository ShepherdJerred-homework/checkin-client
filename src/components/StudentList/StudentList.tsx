import * as React from 'react';
import * as style from './StudentList.mod.scss';
import Student from '../data/Student';

export interface StudentListProps {
  students: Student[];
}

export function StudentList(props: StudentListProps) {
  return (
    <section>
      {
        props.students.map(student =>
          <button type="button" className="btn btn-primary btn-large btn-block" key={student.id}>
            {student.firstName} {student.lastName} <span className={`${style.status} material-icons md-dark`}>home</span>
          </button>
        )
      }
    </section>
  );
}

export default StudentList;
