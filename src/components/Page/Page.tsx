import * as React from 'react';
import App from '../../App';
import * as style from './Page.mod.scss';

function Page(props: { }) {
  return (
    <div className={style.page}>
      <div data-tag='pane' className={`${style.pane} ${style.left}`}>
        <App.ListPane/>
      </div>
      <div data-tag='pane' className={style.pane}>
        <App.ListPane/>
      </div>
      <div data-tag='pane' className={`${style.pane} ${style.right}`}>
        <App.ListPane/>
      </div>
    </div>
  );
}

export default Page;
