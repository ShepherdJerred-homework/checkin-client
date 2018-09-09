import * as React from 'react';
import App from '../../App';
import * as style from './ListPane.mod.scss';

function Page(props: { }) {
  return (
    <div data-tag='list-pane' className={style.listPane}>
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
