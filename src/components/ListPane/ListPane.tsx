import * as React from 'react';
import App from '../../App';
import { showMenu } from '../../store/Action';
import * as style from './ListPane.mod.scss';

export interface ListPaneState {
  menuState: 'visible' | 'hidden';
}

export class ListPane extends React.PureComponent<{ }, ListPaneState> {
  constructor(props: { }) {
    super(props);
    this.state = { menuState: 'hidden' };
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }

  showMenu() {
    this.setState({ menuState: 'visible' });
  }

  hideMenu() {
    this.setState({ menuState: 'hidden' });
  }

  render() {
    return (
      <div data-tag='list-pane' className={style.listPane}>
        <App.Menu menuState={this.state.menuState} onClose={this.hideMenu}/>
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
