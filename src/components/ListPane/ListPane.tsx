import * as React from 'react';
import App from '../../App';
import { showMenu } from '../../store/Action';
import { classNames, ClassTag } from '../../store/Class';
import { MenuResult } from '../Menu/Menu';
import * as style from './ListPane.mod.scss';

export interface ListPaneState {
  menuState: 'visible' | 'hidden';
  chooserState: 'visible' | 'hidden';
  showingClasses: ClassTag;
}

export class ListPane extends React.PureComponent<{ }, ListPaneState> {
  constructor(props: { }) {
    super(props);
    this.state = {
      menuState: 'hidden',
      chooserState: 'hidden',
      showingClasses: 'all',
    };
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.hideChooser = this.hideChooser.bind(this);
  }

  showMenu() {
    this.setState({ menuState: 'visible' });
  }

  hideMenu(result: MenuResult) {
    this.setState({ menuState: 'hidden' });
    if (result === 'classes') {
      this.setState({ chooserState: 'visible' });
    }
  }

  hideChooser(result?: ClassTag) {
    this.setState({ chooserState: 'hidden' });
    if (result) {
      this.setState({ showingClasses: result });
    }
  }

  render() {
    return (
      <div data-tag='list-pane' className={style.listPane}>
        {
          this.state.menuState === 'visible' ?
            <App.Menu onClose={this.hideMenu}/> :
            undefined
        }
        {
          this.state.chooserState === 'visible' ?
            <App.ClassChooser initial={this.state.showingClasses} onClose={this.hideChooser}/> :
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
            <App.StudentList show={this.state.showingClasses}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ListPane;
