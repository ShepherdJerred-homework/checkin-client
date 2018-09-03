import * as React from 'react';
import * as Redux from 'react-redux';
import Class from '../../store/Class';
import { SortCriterion } from '../../store/SortCriterion';
import State from '../../store/State';
import Student from '../../store/Student';
import { Dictionary } from '../../util';
import * as style from './StudentList.mod.scss';

interface StudentListProps {
  classes: Dictionary<Class>;
  students: Dictionary<Student>;
  list: string[];
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
        props.list.map(id => (student =>
          <button
            type='button'
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
        )(props.students[id]))
      }
    </section>
  );
}


const classOrdinals: Dictionary<number> = {
  threes: 1,
  fours: 2,
  kinder: 3,
  null: 4,
};

const statusOrdinals: Dictionary<number> = {
  awaited: 1,
  present: 2,
  away: 3,
};

function compareStudentsBySingleCriterion(criterion: SortCriterion, a: Student, b: Student) {
  switch (criterion) {
    case 'firstName':
      return a.firstName.localeCompare(b.firstName);
    case 'lastName':
      return a.lastName.localeCompare(b.lastName);
    case 'class':
      return classOrdinals[a.class] - classOrdinals[b.class];
    case 'status':
      return statusOrdinals[a.status] - statusOrdinals[b.status];
  }
}

function compareStudentsByMultipleCriteria(students: Dictionary<Student>, criteria: SortCriterion[]) {
  return (a: string, b: string) => {
    for (const criterion of criteria) {
      const diff = compareStudentsBySingleCriterion(criterion, students[a], students[b]);
      if (diff !== 0) {
        return diff;
      }
    }
    return 0;
  };
}

function mapStateToProps(state: State) {
  const list = Object.keys(state.students);
  list.sort(compareStudentsByMultipleCriteria(state.students, state.sortCriteria));
  return {
    classes: state.classes,
    students: state.students,
    criteria: state.sortCriteria,
    list,
  };
}

export const StudentList = Redux.connect(mapStateToProps)(StudentListWithStore);

export default StudentList;
