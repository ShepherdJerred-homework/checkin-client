import * as React from 'react';
import App from '../../App';
import * as style from './Page.mod.scss';

export function Page() {
  return (
    <div className={style.page}>
      <header className={style.header}>
        Header
      </header>
      <div className={style.content}>
        <App.StudentData render={App.StudentList}/>
      </div>
    </div>
  );
}

export default Page;
