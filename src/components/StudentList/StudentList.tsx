import * as React from 'react';
import * as Redux from 'react-redux';
import App from '../../App';
import { setStudentStatus } from '../../services/Message';
import Class, { ClassTag } from '../../store/Class';
import { SortCriterion } from '../../store/SortCriterion';
import State from '../../store/State';
import Student, { Status } from '../../store/Student';
import { Dictionary } from '../../util';
import * as style from './StudentList.mod.scss';

interface StudentListProps {
  classes: Dictionary<Class>;
  students: Dictionary<Student>;
  studentList: string[];
  sortCriteria: SortCriterion[];
  show: ClassTag;
  onSelect: (studentId: string) => void;
}

function StudentList(props: StudentListProps) {

  const showingStudents = props.show === 'all' ?
    props.studentList.slice() :
    props.studentList.filter(id => props.students[id].class === props.show);

  const studentOrder = showingStudents.slice();
  studentOrder.sort(compareStudentsByMultipleCriteria(props.students, props.sortCriteria));
  const studentPosition: Dictionary<number> = { };
  for (let i = 0, l = studentOrder.length; i < l; ++i) {
    studentPosition[studentOrder[i]] = i;
  }

  function studentStyle(id: string) {
    return {
      top: studentPosition[id] * 4 + 'rem',
      backgroundColor: studentPosition[id] % 2 ? '#f8f8f8' : '#fff',
    };
  }

  return (
    <section className={`list-group ${style.list}`}>
    {
      showingStudents.map(id => (student =>
        <div
          data-tag='student'
          className={`list-group-item ${style.student}`}
          style={studentStyle(student.id)}
          key={student.id}
          onClick={props.onSelect.bind(null, student.id)}
        >
          <App.StatusIcon status={student.status} loading={student.statusLoading}/>
          <div className={style.name}>
          {
            (props.sortCriteria.indexOf('firstName') < props.sortCriteria.indexOf('lastName')) ?
              `${student.firstName} ${student.lastName}` :
              `${student.lastName}, ${student.firstName}`
          }
          </div>
          <App.ClassBadge classTag={student.class}/>
        </div>
      )(props.students[id]))
    }
    </section>
  );
}

const classOrdinals: Dictionary<number> = {
  twos: 0,
  threes: 1,
  fours: 2,
  kinder: 3,
  null: 4,
};

const statusOrdinals: Dictionary<number, Status> = {
  ready: 0,
  present: 1,
  absent: 2,
};

const statusOrdering: Status[] = [ 'absent', 'present', 'ready' ];

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
    studentList: state.studentList,
  };
}

export default Redux.connect(mapStateToProps)(StudentList);
