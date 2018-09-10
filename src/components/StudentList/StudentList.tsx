import * as React from 'react';
import * as Redux from 'react-redux';
import App from '../../App';
import { setStudentStatus } from '../../services/Message';
import Class from '../../store/Class';
import { SortCriterion } from '../../store/SortCriterion';
import State from '../../store/State';
import Student from '../../store/Student';
import { Dictionary } from '../../util';
import * as style from './StudentList.mod.scss';

interface StudentListProps {
  classes: Dictionary<Class>;
  students: Dictionary<Student>;
  studentList: string[];
  sortCriteria: SortCriterion[];
}

interface StudentListState {

}

function StudentListWithStore(props: StudentListProps) {
  function getClassStyle(student: Student) {
    if (student.class === null || ! (student.class in props.classes)) {
      return style.noclass;
    }
    else {
      const clas = props.classes[student.class];
      const tag = clas.tag as 'threes' | 'fours' | 'kinder';
      return style[tag];
    }
  }

  const studentOrder = props.studentList.slice();
  studentOrder.sort(compareStudentsByMultipleCriteria(props.students, props.sortCriteria));
  const studentPosition: Dictionary<number> = { };
  for (let i = 0, l = studentOrder.length; i < l; ++i) {
    studentPosition[studentOrder[i]] = i;
  }

  return (
    <section className={style.list}>
      <div>
      {
        props.studentList.map(id => (student =>
          <button
            type='button'
            className={`btn btn-large btn-block ${getClassStyle(student)}`}
            style={{ top: studentPosition[student.id] * 3.25 + 'em' }}
            key={student.id}
            onClick={ () => nextStatus(student) }
          >
            {
              (props.sortCriteria.indexOf('firstName') < props.sortCriteria.indexOf('lastName')) ?
                `${student.firstName} ${student.lastName}` :
                `${student.lastName}, ${student.firstName}`
            }
            <span className={student.highlightId ? `${style.status} ${style.highlight}` : style.status}>
              <i className='material-icons md-dark'>{statusIcons[student.status]}</i>
            </span>
          </button>
        )(props.students[id]))
      }
      </div>
    </section>
  );
}

const classOrdinals: Dictionary<number> = {
  threes: 0,
  fours: 1,
  kinder: 2,
  null: 3,
};

const statusOrdinals: Dictionary<number> = {
  awaited: 0,
  present: 1,
  away: 2,
};

const statusIcons: Dictionary<string> = {
  away: 'home',
  present: 'person',
  awaited: 'directions_walk',
};

const statusOrdering: string[] = [ 'away', 'present', 'awaited' ];

function nextStatus(student: Student) {
  const pos = statusOrdering.indexOf(student.status);
  const nextPos = (pos + 1) % statusOrdering.length;
  App.backend.sendMessage(setStudentStatus(student.id, statusOrdering[nextPos]));
}

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
  return {
    classes: state.classes,
    students: state.students,
    sortCriteria: state.sortCriteria,
    studentList: state.studentList,
  };
}

export const StudentList = Redux.connect(mapStateToProps)(StudentListWithStore);

export default StudentList;
