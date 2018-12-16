import * as React from 'react';
import * as Redux from 'react-redux';
import { match, Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router';
import App from '../../App';
import { setStudentStatus } from '../../services/Message';
import { deleteStudent, saveStudent } from '../../services/students';
import { resetState, setConnectionStatus, setFilters, setSortOrder, setStudentStatusLoading } from '../../store/Action';
import { classBadges, classNames, ClassTag, ExactClassTag, exactClassTags } from '../../store/Class';
import { Filter, FilterSet } from '../../store/Filter';
import SortCriterion from '../../store/SortCriterion';
import State from '../../store/State';
import { Status, StudentEdit } from '../../store/Student';
import { bindMethods } from '../../util';
import { MenuResult } from '../Menu/Menu';
import * as style from './Page.mod.scss';

interface PageState {
  overlay?: 'menu' | 'status' | 'classes' | 'sort' | 'confirmDelete' | 'filter' | 'confirmReset';
  selected?: string;
  condemned?: StudentEdit;
}

interface PageProps extends RouteComponentProps {
  sortOrder: SortCriterion[];
  filters: FilterSet;
  match: match<{ task: string }>;
  isConnected: boolean;
}

function classes(filters: FilterSet): ExactClassTag[] {
  const classTags: ExactClassTag[] = [ ];
  for (const classTag of exactClassTags) {
    if (filters[classTag as Filter]) {
      classTags.push(classTag);
    }
  }
  return classTags;
}

function selectedClass(classTags: ExactClassTag[]): ClassTag | undefined {
  switch (classTags.length) {
    case 1:
      return classTags[0];
    case 4:
      return 'all';
  }
}

function subheader(filters: FilterSet, classTags?: ExactClassTag[]): string {

  if (! classTags) {
    classTags = classes(filters);
  }

  let h: string;
  switch (classTags.length) {
    case 0:
      h = 'No Classes';
      break;
    case 1:
      h = classNames[classTags[0]];
      break;
    case 2:
      h = `${classBadges[classTags[0]]} & ${classBadges[classTags[1]]}`;
      break;
    case 3:
      h = `${classBadges[classTags[0]]}, ${classBadges[classTags[1]]}, & ${classBadges[classTags[2]]}`;
      break;
    default:
      h = classNames.all;
      break;
  }

  if (filters.a_l && ! filters.m_z) {
    h += ' (A – L)';
  }
  else if (! filters.a_l && filters.m_z) {
    h += ' (M – Z)';
  }

  return h;
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
      'onConfirmDeleteClose',
      'onFilterSelect',
      'onConfirmResetClose'
    );
  }

  onMenuOpen() {
    this.setState({ overlay: 'menu' });
  }

  onMenuClose(result: MenuResult) {
    if (result === 'classes' || result === 'sort' || result === 'filter') {
      this.setState({ overlay: result });
    }
    else if (result === 'reset') {
      this.setState({ overlay: 'confirmReset' });
    }
    else {
      this.setState({ overlay: undefined });
      if (result === 'checkin') {
        this.props.history.push('/checkin');
      }
      else if (result === 'new') {
        this.props.history.push(this.props.location.pathname + '/new');
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
      if (classTag === 'all') {
        App.store.dispatch(setFilters({ twos: true, threes: true, fours: true, kinder: true, a_l: true, m_z: true }));
      }
      else {
        App.store.dispatch(setFilters({ [classTag]: true, a_l: true, m_z: true }));
      }
    }
    this.setState({ overlay: undefined });
  }

  onSortSelect(sortOrder?: SortCriterion[]) {
    if (sortOrder) {
      App.store.dispatch(setSortOrder(sortOrder));
    }
    this.setState({ overlay: undefined });
  }

  onFilterSelect(filters?: FilterSet) {
    if (filters) {
      App.store.dispatch(setFilters(filters));
    }
    this.setState({ overlay: undefined });
  }

  onStudentEdit(student?: StudentEdit, del?: boolean) {
    if (student && del) {
      this.setState({ overlay: 'confirmDelete', condemned: student });
    }
    else {
      if (student) {
        saveStudent(student);
        if (student.id) {
          App.store.dispatch(setStudentStatusLoading(student.id, true));
        }
      }
      if (this.props.location.pathname.match(/^\/checkin(\/|$)/)) {
        this.props.history.push('/checkin');
      }
      else {
        this.props.history.push('/edit');
      }
    }
  }

  onConfirmDeleteClose(confirm: boolean) {
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

  onConfirmResetClose(confirm: boolean) {
    if (confirm) {
      App.store.dispatch(resetState());
    }
    this.setState({ overlay: undefined });
  }

  render() {
    const classTags = classes(this.props.filters);

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
              <App.ClassPicker classTag={selectedClass(classTags)} onSelect={this.onClassSelect}/>
          }
          {
            this.state.overlay === 'sort' &&
              <App.SortPicker order={this.props.sortOrder} onSelect={this.onSortSelect}/>
          }
          {
            this.state.overlay === 'filter' &&
              <App.FilterPicker filters={this.props.filters} onSelect={this.onFilterSelect}/>
          }
          {
            this.state.overlay === 'confirmDelete' && this.state.condemned &&
              <App.Confirm okBtn={{ text: 'Delete', type: 'danger' }} onClose={this.onConfirmDeleteClose}>
                Permanently delete {this.state.condemned.firstName} {this.state.condemned.lastName}?
              </App.Confirm>
          }
          {
            this.state.overlay === 'confirmReset' &&
              <App.Confirm onClose={this.onConfirmResetClose}>
                Return all options to their default settings?
              </App.Confirm>
          }
          <Switch>
            <Route path='/checkin' exact render={() => [
                <App.Header key='page_checkin_1' type='dark' onMenuClick={this.onMenuOpen}>
                  Student Check-In
                  {!this.props.isConnected &&
                    <div>
                      Connection Error
                    </div>
                  }
                </App.Header>,
                <App.Subheader key='page_checkin_2' type='dark'>
                  {subheader(this.props.filters, classTags)}
                </App.Subheader>,
                <section key='page_checkin_3' className={style.scroll}>
                  <App.StudentList
                    onSelect={this.onStudentStatusSelect}
                  />
                </section>,
            ]}/>
            <Route path='/edit' exact render={() => [
                <App.Header key='page_checkin_1' type='dark' onMenuClick={this.onMenuOpen}>
                  Edit Students
                </App.Header>,
                <App.Subheader key='page_checkin_2' type='dark'>
                  {subheader(this.props.filters, classTags)}
                </App.Subheader>,
                <section key='page_checkin_3' className={style.scroll}>
                  <App.StudentList
                    onSelect={this.onStudentEditSelect}
                    editing
                  />
                </section>,
            ]}/>
            <Route path='/*/new' render={() => [
              <App.Header key='page_new_1' type='dark' onMenuClick={this.onMenuOpen}>Add New Student</App.Header>,
              <App.StudentEditor key='page_new_2' onDone={this.onStudentEdit}/>,
            ]}/>
            <Route path='/edit/:studentId' render={props => [
              <App.Header key='page_new_1' type='dark' onMenuClick={this.onMenuOpen}>Edit Students</App.Header>,
              <App.StudentEditor
                key='page_new_2'
                studentId={props.match.params.studentId}
                onDone={this.onStudentEdit}
              />,
            ]}/>
            <Redirect to='/checkin'/>
          </Switch>
        </div>
      </div>
    );
  }

}

function mapStoreToProps(store: State) {
  return {
    sortOrder: store.sortOrder,
    filters: store.filters,
    isConnected: store.status.isConnected
  };
}

export default withRouter(Redux.connect(mapStoreToProps)(Page));
