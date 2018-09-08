import { createStore } from 'redux';
import AlertPanel from './components/AlertPanel/AlertPanel';
import Page from './components/Page/Page';
import StudentList from './components/StudentList/StudentList';
import BackEnd from './services/BackEnd';
import * as classes from './services/classes';
import * as logger from './services/logger';
import * as students from './services/students';
import reducer from './store/reducers';

export default {
  Page,
  AlertPanel,
  StudentList,
  classes,
  logger,
  students,
  store: createStore(reducer),
  backend: new BackEnd(),
};