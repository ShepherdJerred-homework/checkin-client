import * as React from 'react';
import * as Redux from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import App from '../../App';
import { setStudentStatus } from '../../services/Message';
import { deleteStudent, saveStudent } from '../../services/students';
import { setClassTag, setSortOrder, setStudentStatusLoading } from '../../store/Action';
import { classNames, ClassTag } from '../../store/Class';
import SortCriterion from '../../store/SortCriterion';
import State from '../../store/State';
import { Status, StudentEdit } from '../../store/Student';
import { bindMethods } from '../../util';
import { MenuResult } from '../Menu/Menu';
import * as style from './Page.mod.scss';

interface PageState {
  overlay?: 'menu' | 'status' | 'classes' | 'sort' | 'confirm';
  selected?: string;
  condemned?: StudentEdit;
}

interface PageProps extends RouteComponentProps {
  classTag: ClassTag;
  sortOrder: SortCriterion[];
}

class Page extends React.PureComponent<PageProps, PageState> {

  constructor(props: PageProps) {
    super(props);
    const pathname = this.props.location.pathname;
    this.state = { };
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
        this.props.history.push('/checkin');
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
      App.store.dispatch(setClassTag(classTag));
    }
    this.setState({ overlay: undefined });
  }

  onSortSelect(sortOrder?: SortCriterion[]) {
    if (sortOrder) {
      App.store.dispatch(setSortOrder(sortOrder));
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
              <App.ClassPicker classTag={this.props.classTag} onSelect={this.onClassSelect}/>
          }
          {
            this.state.overlay === 'sort' &&
              <App.SortPicker order={this.props.sortOrder} onSelect={this.onSortSelect}/>
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
                <App.Subheader key='page_checkin_2' type='dark'>{classNames[this.props.classTag]}</App.Subheader>,
                <section key='page_checkin_3' className={style.scroll}>
                  <App.StudentList
                    show={this.props.classTag}
                    sortCriteria={this.props.sortOrder}
                    onSelect={this.onStudentStatusSelect}
                  />
                </section>,
            ]}/>
            <Route path='/edit' exact render={() => [
                <App.Header key='page_checkin_1' type='dark' onMenuClick={this.onMenuOpen}>
                  Edit Students
                </App.Header>,
                <App.Subheader key='page_checkin_2' type='dark'>{classNames[this.props.classTag]}</App.Subheader>,
                <section key='page_checkin_3' className={style.scroll}>
                  <App.StudentList
                    show={this.props.classTag}
                    sortCriteria={this.props.sortOrder.filter(c => c !== 'status')}
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

function mapStateToProps(state: State) {
  return {
    classTag: state.classTag,
    sortOrder: state.sortOrder,
  };
}

export default withRouter(Redux.connect(mapStateToProps)(Page));
