import * as React from 'react';
import * as Redux from 'react-redux';
import App from '../../App';
import { setColumnCount } from '../../store/Action';
import State from '../../store/State';
import * as style from './Menu.mod.scss';

export type MenuResult = 'classes' | 'sort' | 'add' | undefined;

interface MenuProps {
  onClose: (result?: MenuResult) => void;
  columnCount: number;
}

function MenuWithStore(props: MenuProps) {
  function checkmarkClass(count: number) {
    const classNames = [ 'material-icons', 'md-dark' ];
    if (count !== props.columnCount) {
      classNames.push(style.invisible);
    }
    return classNames.join(' ');
  }

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
        else {
          const match = el.id.match(/^col(\d)$/);
          if (match) {
            App.store.dispatch(setColumnCount(Number(match[1])));
          }
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
          <div className='list-group-item disabled'>Columns</div>
          <button id='col1' className='list-group-item list-group-item-action'>
            <i className={checkmarkClass(1)}>done</i>&nbsp; 1
          </button>
          <div id='col2' className='list-group-item list-group-item-action'>
            <i className={checkmarkClass(2)}>done</i>&nbsp; 2
          </div>
          <div id='col3' className='list-group-item list-group-item-action'>
            <i className={checkmarkClass(3)}>done</i>&nbsp; 3
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: State) {
  return {
    columnCount: state.columnCount,
  };
}

export const Menu = Redux.connect(mapStateToProps)(MenuWithStore);

export default Menu;
