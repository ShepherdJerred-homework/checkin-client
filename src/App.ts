import { createStore } from 'redux';
// import AlertPanel from './components/AlertPanel/AlertPanel';
import ClassBadge from './components/ClassBadge/ClassBadge';
import ClassPicker from './components/ClassPicker/ClassPicker';
import Header, { Subheader } from './components/Header/Header';
// import ListPane from './components/ListPane/ListPane';
import Menu from './components/Menu/Menu';
import Page from './components/Page/Page';
import SortPicker from './components/SortPicker/SortPicker';
import StatusIcon from './components/StatusIcon/StatusIcon';
import StatusPicker from './components/StatusPicker/StatusPicker';
import StudentList from './components/StudentList/StudentList';
import BackEnd from './services/BackEnd';
import * as classes from './services/classes';
import * as logger from './services/logger';
import * as students from './services/students';
import reducer from './store/reducers';

export default {
  // AlertPanel,
  Page,
  ClassBadge,
  ClassPicker,
  Header,
  // ListPane,
  Menu,
  SortPicker,
  StudentList,
  StatusIcon,
  StatusPicker,
  Subheader,
  classes,
  logger,
  students,
  store: createStore(reducer),
  backend: new BackEnd(),
};
