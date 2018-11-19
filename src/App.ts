import ClassBadge from './components/ClassBadge/ClassBadge';
import ClassPicker from './components/ClassPicker/ClassPicker';
import Confirm from './components/Confirm/Confirm';
import Header, { Subheader } from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Page from './components/Page/Page';
import SortPicker from './components/SortPicker/SortPicker';
import StatusIcon from './components/StatusIcon/StatusIcon';
import StatusPicker from './components/StatusPicker/StatusPicker';
import StudentEditor from './components/StudentEditor/StudentEditor';
import StudentList from './components/StudentList/StudentList';
import BackEnd from './services/BackEnd';
import * as classes from './services/classes';
import * as logger from './services/logger';
import * as students from './services/students';
import { createStore } from './store/State';

export default {
  ClassBadge,
  ClassPicker,
  Confirm,
  Header,
  Menu,
  Page,
  SortPicker,
  StudentList,
  StatusIcon,
  StatusPicker,
  StudentEditor,
  Subheader,
  classes,
  logger,
  students,
  store: createStore(),
  backend: new BackEnd(),
};
