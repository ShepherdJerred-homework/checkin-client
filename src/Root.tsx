import * as React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import './Root.scss';
import { loadClasses } from './store/Action';

export class Root extends React.Component {
  async componentDidMount() {
    const classes = await App.classes.getClasses();
    App.store.dispatch(loadClasses(classes));
    App.backend.initCommunication();
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
