import * as React from 'react';
import * as style from './Confirm.mod.scss';

interface ConfirmProps {
  children?: React.ReactNode;
  onClose: (confirm: boolean) => void;
}

export default function Confirm(props: ConfirmProps) {
  return (
    <section data-tag='class-picker-backdrop' className={style.backdrop}>
      <div className='list-group'>
        <div className={`list-group-item list-group-item-secondary ${style.header}`}>
          Confirm
        </div>
        <div className={`list-group-item`}>
          {props.children}
        </div>
        <div className={`list-group-item list-group-item-secondary ${style.buttonRow}`}>
          <button
            className='btn btn-secondary'
            onClick={() => props.onClose(false)}
          >Cancel</button>
          <button
            className='btn btn-danger'
            onClick={() => props.onClose(true)}
          >Delete</button>
        </div>
      </div>
    </section>
  );
}