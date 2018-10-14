import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import App from '../../App';
import { setStudentStatus } from '../../services/Message';
import { saveStudent, deleteStudent } from '../../services/students';
import { setStudentStatusLoading } from '../../store/Action';
import { classNames, ClassTag } from '../../store/Class';
import SortCriterion from '../../store/SortCriterion';
import { Status, StudentEdit } from '../../store/Student';
import { bindMethods } from '../../util';
import { MenuResult } from '../Menu/Menu';
import * as style from './Page.mod.scss';

interface State {
  overlay?: 'menu' | 'status' | 'classes' | 'sort' | 'confirm';
  selected?: string;
  condemned?: StudentEdit;
  classTag: ClassTag;
  sortOrder: SortCriterion[];
}

class Page extends React.PureComponent<RouteComponentProps, State> {

  constructor(props: RouteComponentProps) {
    super(props);
    const pathname = this.props.location.pathname;
    this.state = {
      classTag: 'all',
      sortOrder: [ 'status', 'lastName', 'firstName', 'class' ]
    };
    bindMethods(this,
      'onMenuOpen',
      'onMenuClose',
      'onStudentStatusSelect',
      'onStudentEditSelect',
      'onStatusSelect',
      'onClassSelect',
      'onSortSelect',
      'onStudentEdit',
      'onConfirmClose'
    );
  }

  onMenuOpen() {
    this.setState({ overlay: 'menu' });
  }

  onMenuClose(result: MenuResult) {
    if (result === 'classes' || result === 'sort') {
      this.setState({ overlay: result });
    }
    else {
      this.setState({ overlay: undefined });
      if (result === 'checkin') {
        this.props.history.push('/checkin')
      }
      else if (result === 'new') {
        this.props.history.push('/new');
      }
      else if (result === 'edit') {
        this.props.history.push('/edit');
      }
    }
  }

  onStudentStatusSelect(studentId: string) {
    this.setState({ overlay: 'status', selected: studentId });
  }

  onStudentEditSelect(studentId: string) {
    this.props.history.push('/edit/' + studentId);
  }

  onStatusSelect(status?: Status) {
    if (this.state.selected && status) {
      App.backend.sendMessage(setStudentStatus(this.state.selected, status));
      App.store.dispatch(setStudentStatusLoading(this.state.selected, true));
    }
    this.setState({ overlay: undefined, selected: undefined });
  }

  onClassSelect(classTag?: ClassTag) {
    if (classTag) {
      this.setState({ classTag });
    }
    this.setState({ overlay: undefined });
  }

  onSortSelect(sortOrder?: SortCriterion[]) {
    if (sortOrder) {
      this.setState({ sortOrder });
    }
    this.setState({ overlay: undefined });
  }

  onStudentEdit(student?: StudentEdit, del?: boolean) {
    if (student && del) {
      this.setState({ overlay: 'confirm', condemned: student });
    }
    else {
      if (student) {
        saveStudent(student);
        if (student.id) {
          App.store.dispatch(setStudentStatusLoading(student.id, true));
        }
      }
      this.props.history.push('/edit');
    }
  }

  onConfirmClose(confirm: boolean) {
    if (confirm && this.state.condemned && this.state.condemned.id) {
      deleteStudent(this.state.condemned.id);
      this.setState({ overlay: undefined, condemned: undefined });
      App.store.dispatch(setStudentStatusLoading(this.state.condemned.id, true));
      this.props.history.push('/edit');
    }
    else {
      this.setState({ overlay: undefined, condemned: undefined });
    }
  }

  render() {
    return (
      <div data-tag='page' className={style.page}>
        <div data-tag='column' className={style.column}>
          {
            this.state.overlay === 'menu' &&
              <App.Menu onMenuClose={this.onMenuClose}/>
          }
          {
            this.state.overlay === 'status' && this.state.selected &&
              <App.StatusPicker studentId={this.state.selected} onSelect={this.onStatusSelect}/>
          }
          {
            this.state.overlay === 'classes' &&
              <App.ClassPicker classTag={this.state.classTag} onSelect={this.onClassSelect}/>
          }
          {
            this.state.overlay === 'sort' &&
              <App.SortPicker order={this.state.sortOrder} onSelect={this.onSortSelect}/>
          }
          {
            this.state.overlay === 'confirm' && this.state.condemned &&
              <App.Confirm onClose={this.onConfirmClose}>
                Permanently delete {this.state.condemned.firstName} {this.state.condemned.lastName}?
              </App.Confirm>
          }
          <Switch>
            <Route path='/checkin' render={() => [
                <App.Header key='page_checkin_1' type='dark' onMenuClick={this.onMenuOpen}>
                  Student Check-In
                </App.Header>,
                <App.Subheader key='page_checkin_2' type='dark'>{classNames[this.state.classTag]}</App.Subheader>,
                <section key='page_checkin_3' className={style.scroll}>
                  <App.StudentList
                    show={this.state.classTag}
                    sortCriteria={this.state.sortOrder}
                    onSelect={this.onStudentStatusSelect}
                  />
                </section>,
            ]}/>
            <Route path='/edit' exact render={() => [
                <App.Header key='page_checkin_1' type='dark' onMenuClick={this.onMenuOpen}>
                  Edit Students
                </App.Header>,
                <App.Subheader key='page_checkin_2' type='dark'>{classNames[this.state.classTag]}</App.Subheader>,
                <section key='page_checkin_3' className={style.scroll}>
                  <App.StudentList
                    show={this.state.classTag}
                    sortCriteria={this.state.sortOrder.filter(c => c !== 'status')}
                    onSelect={this.onStudentEditSelect}
                    editing
                  />
                </section>,
            ]}/>
            <Route path='/edit/:studentId' render={props => [
              <App.Header key='page_new_1' type='dark' onMenuClick={this.onMenuOpen}>Edit Students</App.Header>,
              <App.StudentEditor
                key='page_new_2'
                studentId={props.match.params.studentId}
                onDone={this.onStudentEdit}
              />,
            ]}/>
            <Route path='/new' render={() => [
              <App.Header key='page_new_1' type='dark' onMenuClick={this.onMenuOpen}>Add New Student</App.Header>,
              <App.StudentEditor key='page_new_2' onDone={this.onStudentEdit}/>,
            ]}/>
            <Redirect to='/checkin'/>
          </Switch>
        </div>
      </div>
    );
  }

}

export default withRouter(Page);
