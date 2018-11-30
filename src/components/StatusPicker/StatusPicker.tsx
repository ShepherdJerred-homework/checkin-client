import * as React from 'react';
import * as Redux from 'react-redux';
import App from '../../App';
import { State } from '../../store/State';
import { Status, Student } from '../../store/Student';
import { Dictionary } from '../../util';
import * as style from '../Backdrop/Backdrop.mod.scss';

interface StatusPickerProps {
  studentId: string;
  students: Dictionary<Student>;
  onSelect: (status?: Status) => void;
}

function StatusPicker(props: StatusPickerProps) {
  const student = props.students[props.studentId];

  function studentClassName(status: string) {
    if (status === student.status) {
      return 'list-group-item list-group-item-action list-group-item-primary';
    }
    else {
      return 'list-group-item list-group-item-action';
    }
  }

  const onStatusClick = (status: Status) => () => {
    if (status === student.status) {
      props.onSelect();
    }
    else {
      props.onSelect(status);
    }
  };

  return (
    <section data-tag='status-picker-backdrop' className={style.backdrop}>
      <div className='list-group'>
        <div className={`list-group-item list-group-item-secondary ${style.header}`}>
          <div className={style.text}>
            {student.firstName} {student.lastName}
          </div>
          <div className={style.close} onClick={() => props.onSelect()}>
            <i className='material-icons'>close</i>
          </div>
        </div>
        <div
          className={studentClassName('ready')}
          onClick={onStatusClick('ready')}
          style={{ paddingLeft: 0 }}
        >
          <App.StatusIcon status='ready'/>
          <div className={style.text}>
            Waiting for pick-up
          </div>
        </div>
        <div
          className={studentClassName('present')}
          onClick={onStatusClick('present')}
          style={{ paddingLeft: 0 }}
        >
          <App.StatusIcon status='present'/>
          <div className={style.text}>
            In class
          </div>
        </div>
        <div
          className={studentClassName('absent')}
          onClick={onStatusClick('absent')}
          style={{ paddingLeft: 0 }}
        >
          <App.StatusIcon status='absent'/>
          <div className={style.text}>
            Not here
          </div>
        </div>
      </div>
    </section>
  );
}

function mapStateToProps(state: State) {
  return {
    students: state.students,
  };
}

export default Redux.connect(mapStateToProps)(StatusPicker);
