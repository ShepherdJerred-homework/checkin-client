import * as React from 'react';
import { Provider } from 'react-redux';
import { loadClasses } from './store/Action';
import App from './App';
import './Root.scss';

export class Root extends React.Component {
  async componentDidMount() {
    const classes = await App.classes.getClasses();
    App.store.dispatch(loadClasses(classes));
  }

  public render() {
    return (
      <Provider store={App.store}>
        <App.Page/>
      </Provider>
    );
  }
}

export default Root;
