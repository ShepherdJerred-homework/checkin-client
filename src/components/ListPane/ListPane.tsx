import * as React from 'react';
import App from '../../App';
import { showMenu } from '../../store/Action';
import { MenuResult } from '../Menu/Menu';
import * as style from './ListPane.mod.scss';

export interface ListPaneState {
  menuState: 'visible' | 'hidden';
  chooserState: 'visible' | 'hidden';
}

export class ListPane extends React.PureComponent<{ }, ListPaneState> {
  constructor(props: { }) {
    super(props);
    this.state = {
      menuState: 'hidden',
      chooserState: 'hidden',
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

  hideChooser() {
    this.setState({ chooserState: 'hidden' });
  }

  render() {
    return (
      <div data-tag='list-pane' className={style.listPane}>
        <App.Menu menuState={this.state.menuState} onClose={this.hideMenu}/>
        {
          this.state.chooserState === 'visible' ?
            <App.ClassChooser initial='all' onClose={this.hideChooser}/> :
            undefined
        }
        <header className={style.header}>
          <button className={style.menuBtn} onClick={this.showMenu}>
            <i className='material-icons md-light'>menu</i>
          </button>
          All Students
        </header>
        <div className={style.content}>
          <div className={style.pane}>
            <App.AlertPanel/>
            <App.StudentList/>
          </div>
        </div>
      </div>
    );
  }
}

export default ListPane;
