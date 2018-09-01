import * as React from 'react';
import App from '../App';
import Student from '../store/Student';
import { realpathSync } from 'fs';

interface StudentViewProps {
  students: Student[];
  loading: boolean;
}

interface StudentDataProps {
  render: string | React.StatelessComponent<StudentViewProps> | React.ComponentClass<StudentViewProps>;
}

interface StudentDataState {
  studentList: Student[];
  loading: boolean;
}


export class StudentData extends React.PureComponent<StudentDataProps, StudentDataState> {

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
      this.setState({ studentList: await App.students.getStudents(), loading: false });
    }
    catch (err) {
      App.logger.error(err);
    }
  }
}

export default StudentData;
