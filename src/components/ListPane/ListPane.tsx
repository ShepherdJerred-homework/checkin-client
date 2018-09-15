import * as React from 'react';
import App from '../../App';
import { classNames, ClassTag } from '../../store/Class';
import { SortCriterion } from '../../store/SortCriterion';
import { MenuResult } from '../Menu/Menu';
import * as style from './ListPane.mod.scss';

export interface ListPaneState {
  overlay: 'none' | 'menu' | 'chooser' | 'sorter';
  showingClasses: ClassTag;
  sortCriteria: SortCriterion[];
}

export class ListPane extends React.PureComponent<{ }, ListPaneState> {
  constructor(props: { }) {
    super(props);
    this.state = {
      overlay: 'none',
      showingClasses: 'all',
      sortCriteria: [ 'status', 'lastName', 'firstName', 'class' ],
    };
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.hideChooser = this.hideChooser.bind(this);
    this.hideSorter = this.hideSorter.bind(this);
  }

  showMenu() {
    this.setState({ overlay: 'menu' });
  }

  hideMenu(result: MenuResult) {
    if (result === 'classes') {
      this.setState({ overlay: 'chooser' });
    }
    else if (result === 'sort') {
      this.setState({ overlay: 'sorter' });
    }
    else {
      this.setState({ overlay: 'none' });
    }
  }

  hideChooser(result?: ClassTag) {
    this.setState({ overlay: 'none' });
    if (result) {
      this.setState({ showingClasses: result });
    }
  }

  hideSorter(result?: SortCriterion[]) {
    if (result) {
      let same = true;
      for (let i = 0, l = result.length; i < l; ++i) {
        if (result[i] !== this.state.sortCriteria[i]) {
          same = false;
          break;
        }
      }
      if (! same) {
        this.setState({ sortCriteria: result });
      }
    }
    this.setState({ overlay: 'none' });
  }

  render() {
    return (
      <div data-tag='list-pane' className={style.listPane}>
        {
          this.state.overlay === 'menu' ?
            <App.Menu onClose={this.hideMenu}/> :
          this.state.overlay === 'chooser' ?
            <App.ClassChooser initial={this.state.showingClasses} onClose={this.hideChooser}/> :
          this.state.overlay === 'sorter' ?
            <App.SortOrderButton initial={this.state.sortCriteria}  onClose={this.hideSorter}/> :
            undefined
        }
        <header className={style.header}>
          <button className={style.menuBtn} onClick={this.showMenu}>
            <i className='material-icons md-light'>menu</i>
          </button>
          {classNames[this.state.showingClasses]}
        </header>
        <div className={style.content}>
          <div className={style.pane}>
            <App.AlertPanel/>
            <App.StudentList show={this.state.showingClasses} sortCriteria={this.state.sortCriteria}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ListPane;
