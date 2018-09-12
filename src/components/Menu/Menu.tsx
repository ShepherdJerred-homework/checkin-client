import * as React from 'react';
import * as style from './Menu.mod.scss';

export type MenuResult = 'classes' | 'sort' | 'add' | undefined;

interface MenuProps {
  onClose: (result?: MenuResult) => void;
}

function Menu(props: MenuProps) {
  return (
    <div
      data-tag='menu'
      className={style.menu}
      onClick={event => {
        const el = event.target as HTMLElement;
        let result: MenuResult;
        if (el.id === 'classes' || el.id === 'sort' || el.id === 'add') {
          result = el.id;
        }
        props.onClose(result);
      }}
    >
      <div className={style.display}>
        <div className={style.header}>
          <button className={style.menuBtn} onClick={() => props.onClose}>
            <i className='material-icons md-dark'>menu</i>
          </button>
          Settings
        </div>
        <div className='list-group list-group-flush'>
          <button id='classes' className='list-group-item list-group-item-action'>
            Classes
          </button>
          <button id='sort' className='list-group-item list-group-item-action'>
            Sort Order
          </button>
          <button id='add' className='list-group-item list-group-item-action'>
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
