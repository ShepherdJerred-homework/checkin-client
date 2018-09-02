import * as React from 'react';
import * as Redux from 'react-redux';
import * as style from './StudentList.mod.scss';
import Class from '../../store/Class';
import State from '../../store/State';
import Student from '../../store/Student';
import { Dictionary } from '../../util';

export interface StudentListProps {
  classes: Dictionary<Class>;
  students: Student[];
  loading: boolean;
}

function StudentListWithStore(props: StudentListProps) {
  function getColor(student: Student) {
    if (student.class === null || ! (student.class in props.classes)) {
      return style.gray;
    }
    else {
      const clas = props.classes[student.class];
      const color = clas.color;
      return (style as any)[color];
    }
  }

  return (
    <section className={style.list}>
      {
        props.students.map(student =>
          <button type="button" className={`btn btn-large btn-block ${getColor(student)}`} key={student.id}>
            {student.firstName} {student.lastName}
            <span className={style.status}>
              <i className='material-icons md-dark'>home</i>
            </span>
          </button>
        )
      }
    </section>
  );
}

function mapStateToProps(state: State) {
  return {
    classes: state.classes,
  };
}

export const StudentList = Redux.connect(mapStateToProps)(StudentListWithStore);

export default StudentList;
