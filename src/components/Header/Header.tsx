import * as React from 'react';
import * as style from './Header.mod.scss';

interface HeaderProps {
  onMenuClick: () => void;
  type: 'light' | 'dark';
  children?: React.ReactNode;
}

export default function Header(props: HeaderProps) {
  let headerClassName;
  let iconClassName;
  if (props.type === 'light') {
    headerClassName = `${style.header} ${style.headerLight}`;
    iconClassName = 'material-icons md-dark';
  }
  else {
    headerClassName = `${style.header} ${style.headerDark}`;
    iconClassName = 'material-icons md-light';
  }

  return (
    <section data-tag='header' className={headerClassName}>
      <div className={style.icon} onClick={props.onMenuClick}>
        <i className={iconClassName}>menu</i>
      </div>
      <div className={style.text}>
        {props.children}
      </div>
    </section>
  );
}

interface SubheaderProps {
  type: 'light' | 'dark';
  children?: React.ReactNode;
}

export function Subheader(props: SubheaderProps) {
  let subheaderClassName;
  if (props.type === 'light') {
    subheaderClassName = `${style.subheader} ${style.subheaderLight}`;
  }
  else {
    subheaderClassName = `${style.subheader} ${style.subheaderDark}`;
  }

  return (
    <section data-tag='subheader' className={subheaderClassName}>
      <div className={style.text}>
        {props.children}
      </div>
    </section>
  );
}
