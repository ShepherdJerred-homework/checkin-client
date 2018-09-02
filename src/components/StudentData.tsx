import * as React from 'react';
import * as Redux from 'react-redux';
import { SortCriterion } from '../store/SortCriterion';
import App from '../App';
import Student from '../store/Student';
import { Dictionary } from '../util';
import { State } from '../store/State';


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

function compareStudentsByMultipleCriteria(criteria: SortCriterion[]) {
  return (a: Student, b: Student) => {
    for (const criterion of criteria) {
      const diff = compareStudentsBySingleCriterion(criterion, a, b);
      if (diff !== 0) {
        return diff;
      }
    }
    return 0;
  };
}

interface StudentViewProps {
  students: Student[];
  loading: boolean;
}

interface StudentDataProps {
  render: string | React.StatelessComponent<StudentViewProps> | React.ComponentClass<StudentViewProps>;
  criteria: SortCriterion[];
}

interface StudentDataState {
  studentList: Student[];
  loading: boolean;
}


export class StudentDataWithStore extends React.PureComponent<StudentDataProps, StudentDataState> {

  constructor(props: StudentDataProps) {
    super(props);
    this.state = {
      studentList: [ ],
      loading: true,
    };
  }

  componentWillMount() {
    this.loadStudents();
  }

  render() {
    const View = this.props.render;
    return (
      <View students={this.state.studentList} loading={this.state.loading}/>
    );
  }

  async loadStudents() {
    try {
      const students = await App.students.getStudents();
      students.sort(compareStudentsByMultipleCriteria(this.props.criteria))
      this.setState({ studentList: students, loading: false });
    }
    catch (err) {
      App.logger.error(err);
    }
  }
}

function mapStateToProps(state: State) {
  return {
    criteria: state.sortCriteria,
  };
}

export const StudentData = Redux.connect(mapStateToProps)(StudentDataWithStore);

export default StudentData;
