import * as React from 'react';
import App from '../../App';
import * as style from './Page.mod.scss';

function Page(props: { }) {
  return (
    <div className={style.page}>
      <header className={style.header}>
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

export default Page;
