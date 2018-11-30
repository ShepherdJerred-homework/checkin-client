import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import App from '../../App';
import * as style from './Menu.mod.scss';

export type MenuResult = 'checkin' | 'edit' | 'new' | 'classes' | 'sort' | 'filter' | undefined;

function isMenuResult(id?: string): id is MenuResult {
  return (
    id === 'checkin' ||
    id === 'edit' ||
    id === 'new' ||
    id === 'classes' ||
    id === 'sort' ||
    id === 'filter'
  );
}

interface MenuProps extends RouteComponentProps {
  onMenuClose: (result: MenuResult) => void;
}

function Menu(props: MenuProps) {
  function itemClassName(id: string) {
    if (props.location.pathname.endsWith(id)) {
      return 'list-group-item list-group-item-action list-group-item-primary';
    }
    else {
      return 'list-group-item list-group-item-action';
    }
  }

  function onClick(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      props.onMenuClose(undefined);
    }
    else {
      const id = (event.target as HTMLElement).id;
      if (isMenuResult(id)) {
        props.onMenuClose(id);
      }
    }
  }

  return (
    <div
      data-tag='menu-backdrop'
      className={style.backdrop}
      onClick={onClick}
    >
      <div className={style.display}>
        <App.Header type='light' onMenuClick={() => props.onMenuClose(undefined)}>Menu</App.Header>
        <div className='list-group list-group-flush'>
          <div className={`list-group-item list-group-item-secondary ${style.category}`}>
            Tasks
          </div>
          <div id='checkin' className={`${itemClassName('checkin')} ${style.sub}`}>
            Student Check-In
          </div>
          <div id='edit' className={`${itemClassName('edit')} ${style.sub}`}>
            Edit Students
          </div>
          <div id='new' className={`${itemClassName('new')} ${style.sub}`}>
            Add New Student
          </div>
          <div className={`list-group-item list-group-item-secondary ${style.category}`}>
            Options
          </div>
          <div id='classes' className={`list-group-item list-group-item-action ${style.sub}`}>
            Classes
          </div>
          <div id='filter' className={`list-group-item list-group-item-action ${style.sub}`}>
            Filters
          </div>
          <div id='sort' className={`list-group-item list-group-item-action ${style.sub}`}>
            Sort Order
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Menu);
