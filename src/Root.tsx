import * as React from 'react';
import App from './App';
import './Root.scss';

export class Root extends React.Component {
  public render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <App.StudentData render={App.StudentList}/>
      </div>
    );
  }
}

export default Root;
