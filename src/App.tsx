import * as React from 'react';
import * as style from './App.mod.scss';
import './App.scss';

export class App extends React.Component {
  public render() {
    const className = `${style.columnHeader} col-md`;
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className={className}>
              One of three columns
            </div>
            <div className={className}>
              One of three columns
            </div>
            <div className={className}>
              One of three columns
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row justify-content-md-center'>
            <div className='col col-lg-2'>
              1 of 3
            </div>
            <div className='col-md-auto'>
              Variable width content
            </div>
            <div className='col col-lg-2'>
              3 of 3
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              1 of 3
            </div>
            <div className='col-md-auto'>
              Variable width content
            </div>
            <div className='col col-lg-2'>
              3 of 3
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
