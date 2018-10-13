import * as React from 'react';
import App from '../../App';
import { setStudentStatus } from '../../services/Message';
import { setStudentStatusLoading } from '../../store/Action';
import { classNames, ClassTag } from '../../store/Class';
import SortCriterion from '../../store/SortCriterion';
import { Status } from '../../store/Student';
import { bindMethods } from '../../util';
import { MenuResult } from '../Menu/Menu';
import * as style from './Page.mod.scss';

interface PageState {
  overlay?: 'menu' | 'status' | 'classes' | 'sort';
  selected?: string;
  classTag: ClassTag;
  sortOrder: SortCriterion[];
}

class Page extends React.PureComponent<{ }, PageState> {

  constructor(props: { }) {
    super(props);
    this.state = { classTag: 'all', sortOrder: [ 'status', 'lastName', 'firstName', 'class' ] };
    bindMethods(this,
      'onMenuOpen',
      'onMenuClose',
      'onStudentSelect',
      'onStatusSelect',
      'onClassSelect',
      'onSortSelect'
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
    }
  }

  onStudentSelect(studentId: string) {
    this.setState({ overlay: 'status', selected: studentId });
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
          <App.Header type='dark' onMenuClick={this.onMenuOpen}>Check In</App.Header>
          <App.Subheader type='dark'>{classNames[this.state.classTag]}</App.Subheader>
          <div className={style.scroll}>
            <App.StudentList
              show={this.state.classTag}
              sortCriteria={this.state.sortOrder}
              onSelect={this.onStudentSelect}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default Page;
