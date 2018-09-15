import { createStore } from 'redux';
import AlertPanel from './components/AlertPanel/AlertPanel';
import ClassChooser from './components/ClassChooser/ClassChooser';
import ListPane from './components/ListPane/ListPane';
import Menu from './components/Menu/Menu';
import Page from './components/Page/Page';
import SortOrder from './components/SortOrder/SortOrder';
import StudentList from './components/StudentList/StudentList';
import BackEnd from './services/BackEnd';
import * as classes from './services/classes';
import * as logger from './services/logger';
import * as students from './services/students';
import reducer from './store/reducers';

export default {
  Page,
  AlertPanel,
  ClassChooser,
  ListPane,
  Menu,
  SortOrder,
  StudentList,
  classes,
  logger,
  students,
  store: createStore(reducer),
  backend: new BackEnd(),
};
