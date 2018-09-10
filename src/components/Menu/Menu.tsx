import * as React from 'react';
import * as style from './Menu.mod.scss';

interface MenuProps {
  menuState: 'visible' | 'hidden';
  onClose: () => void;
}

function Menu(props: MenuProps) {
  return (
    <div
      className={`${style.menu} ${style[props.menuState]}`}
      onClick={function(this: HTMLElement, event) {
        props.onClose();
      }}
    >
      <div className={style.display}>
        <div className={style.header}>
          <button className={style.menuBtn} onClick={props.onClose}>
            <i className='material-icons md-dark'>menu</i>
          </button>
          Settings
        </div>
        <div className='list-group'>
          <button className='list-group-item list-group-item-action'>
            Classes
          </button>
          <button className='list-group-item list-group-item-action'>
            Sort Order
          </button>
          <button className='list-group-item list-group-item-action'>
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
