import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import './Root.scss';
import { loadClasses } from './store/Action';

export class Root extends React.Component {
  async componentDidMount() {
    App.backend.initCommunication();
    const classes = await App.classes.getClasses();
    App.store.dispatch(loadClasses(classes));
  }

  public render() {
    return (
      <Provider store={App.store}>
        <BrowserRouter>
          <Switch>
            <Route path='/checkin' component={App.Page}/>
            <Redirect to='/checkin'/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
