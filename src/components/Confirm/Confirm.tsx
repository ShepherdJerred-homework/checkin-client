import * as React from 'react';
import * as style from './Confirm.mod.scss';

export interface ButtonDescription {
  text: string;
  type: 'primary' | 'danger';
}

interface ConfirmProps {
  children?: React.ReactNode;
  okBtn?: ButtonDescription;
  onClose: (confirm: boolean) => void;
}

export default function Confirm(props: ConfirmProps) {
  const okBtn = props.okBtn || {
    text: 'OK',
    type: 'primary',
  };
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
            className={`btn btn-${okBtn.type}`}
            onClick={() => props.onClose(true)}
          >{okBtn.text}</button>
        </div>
      </div>
    </section>
  );
}
