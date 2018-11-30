import * as React from 'react';
import * as Redux from 'react-redux';
import { classNames, ExactClassTag, exactClassTags } from '../../store/Class';
import State from '../../store/State';
import Student, { StudentEdit } from '../../store/Student';
import { bindMethods, Dictionary } from '../../util';
import * as style from './StudentEditor.mod.scss';

interface StudentEditorProps {
  onDone: (student?: StudentEdit, del?: boolean) => void;
  students: Dictionary<Student>;
  studentId?: string;
}

type Field = 'firstName' | 'lastName' | 'classTag';

interface StudentEditorState {
  id?: string;
  firstName: string;
  lastName: string;
  classTag: ExactClassTag;
  valid: Dictionary<boolean, Field>;
  touched: Dictionary<boolean, Field>;
}

class StudentEditor extends React.PureComponent<StudentEditorProps, StudentEditorState> {

  constructor(props: StudentEditorProps) {
    super(props);
    if (props.studentId) {
      const student = props.students[props.studentId];
      this.state = {
        firstName: student.firstName,
        lastName: student.lastName,
        classTag: student.class,
        valid: { firstName: true, lastName: true, classTag: true },
        touched: { } as Dictionary<boolean, Field>,
      };
    }
    else {
      this.state = {
        lastName: '',
        firstName: '',
        classTag: 'twos',
        valid: { classTag: true } as Dictionary<boolean, Field>,
        touched: { } as Dictionary<boolean, Field>,
      };
    }

    bindMethods(this, 'onFirstNameInput', 'onLastNameInput', 'onClassTagInput', 'onDone', 'onCancel', 'onDelete');
  }

  onFirstNameInput(event: React.FormEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.setState({
      firstName: value,
      touched: { ...this.state.touched, firstName: true },
      valid: { ...this.state.valid, firstName: value.match(/\S/) !== null },
    });
  }

  onLastNameInput(event: React.FormEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.setState({
      lastName: value,
      touched: { ...this.state.touched, lastName: true },
      valid: { ...this.state.valid, lastName: value.match(/\S/) !== null },
    });
  }

  onClassTagInput(event: React.FormEvent) {
    const value = (event.target as HTMLSelectElement).value as ExactClassTag;
    this.setState({
      classTag: value,
      touched: { ...this.state.touched, classTag: true },
    });
  }

  onDone(event: React.FormEvent) {
    event.preventDefault();
    if (this.state.valid.firstName && this.state.valid.lastName && this.state.valid.classTag) {
      const student: StudentEdit = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        class: this.state.classTag,
      };
      if (this.props.studentId) {
        student.id = this.props.studentId;
      }
      this.props.onDone(student);
    }
    else {
      this.setState({
        touched: { firstName: true, lastName: true, classTag: true },
      });
    }
  }

  onCancel(event: React.FormEvent) {
    event.preventDefault();
    this.props.onDone();
  }

  onDelete(event: React.FormEvent) {
    event.preventDefault();
    const student: StudentEdit = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      class: this.state.classTag,
    };
    if (this.props.studentId) {
      student.id = this.props.studentId;
      this.props.onDone(student, true);
    }
  }

  inputClassName(field: Field) {
    if (this.state.touched[field] && ! this.state.valid[field]) {
      return 'form-control is-invalid';
    }
    else {
      return 'form-control';
    }
  }

  errorMessageClassName(field: Field) {
    if (this.state.touched[field] && ! this.state.valid[field]) {
      return 'form-text text-danger';
    }
    else {
      return `form-text ${style.invisible}`;
    }
  }

  render() {
    return (
      <form className={style.form} onSubmit={this.onDone}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name:</label>
          <input
            id='firstName'
            className={this.inputClassName('firstName')}
            type='text'
            value={this.state.firstName}
            onInput={this.onFirstNameInput}
            autoFocus
          />
          <small className={this.errorMessageClassName('firstName')}>Required</small>
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            id='lastName'
            className={this.inputClassName('lastName')}
            type='text'
            value={this.state.lastName}
            onInput={this.onLastNameInput}
            autoComplete='off'
          />
          <small className={this.errorMessageClassName('lastName')}>Required</small>
        </div>
        <div className='form-group'>
          <label htmlFor='classTag'>Class:</label>
          <select
            id='classTag'
            className='form-control'
            value={this.state.classTag}
            onChange={this.onClassTagInput}
            autoComplete='off'
          >
          {
            exactClassTags.map(classTag =>
              <option key={classTag} value={classTag}>
                {classNames[classTag]}
              </option>
            )
          }
          </select>
          <small className={this.errorMessageClassName('classTag')}>Required</small>
        </div>
        <div className={`form-group ${style.buttonRow}`}>
          <button className='btn btn-primary'>Done</button>
          <button className='btn btn-danger' style={{
            visibility: this.props.studentId ? 'visible' : 'hidden',
          }} onClick={this.onDelete}>Delete</button>
          <button className='btn btn-secondary' onClick={this.onCancel}>Cancel</button>
        </div>
      </form>
    );
  }

}

function mapStateToProps(state: State) {
  return {
    students: state.students,
  };
}

export default Redux.connect(mapStateToProps)(StudentEditor);
