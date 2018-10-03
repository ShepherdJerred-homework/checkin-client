import * as React from 'react';
import * as Redux from 'react-redux';
import App from '../../App';
import State from '../../store/State';
import * as style from './Page.mod.scss';

interface PageProps {
  columnCount: number;
}

function PageWithStore(props: PageProps) {
  return (
    <div className={style.page}>
      {
        props.columnCount >= 2 ?
          <div data-tag='pane' className={`${style.pane} ${style.left}`}>
            <App.ListPane/>
          </div> :
          undefined
      }
      <div data-tag='pane' className={style.pane}>
        <App.ListPane/>
      </div>
      {
        props.columnCount >= 3 ?
          <div data-tag='pane' className={`${style.pane} ${style.right}`}>
            <App.ListPane/>
          </div> :
          undefined
      }
    </div>
  );
}

function mapStateToProps(state: State) {
  return {
    columnCount: state.columnCount,
  };
}

export const Page = Redux.connect(mapStateToProps)(PageWithStore);

export default Page;
