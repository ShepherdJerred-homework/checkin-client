import * as React from 'react';
import * as Redux from 'react-redux';
import * as style from './StudentList.mod.scss';
import Class from '../../store/Class';
import State from '../../store/State';
import Student from '../../store/Student';
import { Dictionary } from '../../util';
import { SortCriterion } from '../../store/SortCriterion';

interface StudentListProps {
  classes: Dictionary<Class>;
  students: Student[];
  loading: boolean;
  criteria: SortCriterion[];
}

function StudentListWithStore(props: StudentListProps) {
  function getColor(student: Student) {
    if (student.class === null || ! (student.class in props.classes)) {
      return style.noclass;
    }
    else {
      const clas = props.classes[student.class];
      const tag = clas.tag as 'threes' | 'fours' | 'kinder';
      return style[tag];
    }
  }

  return (
    <section className={style.list}>
      {
        props.students.map(student =>
          <button
            type="button"
            className={`btn btn-large btn-block ${getColor(student)}`}
            key={student.id}
          >
            {
              (props.criteria.indexOf('firstName') < props.criteria.indexOf('lastName')) ?
                `${student.firstName} ${student.lastName}` :
                `${student.lastName}, ${student.firstName}`
            }
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
    criteria: state.sortCriteria,
  };
}

export const StudentList = Redux.connect(mapStateToProps)(StudentListWithStore);

export default StudentList;
