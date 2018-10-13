import * as React from 'react';
import { Status } from '../../store/Student';
import { Dictionary } from '../../util';
import * as style from './StatusIcon.mod.scss';

const statusIcons: Dictionary<string, Status> = {
  absent: 'home',
  present: 'face',
  ready: 'alarm_add',
};

interface StatusIconProps {
  status: Status;
  loading?: boolean;
}

function StatusIcon(props: StatusIconProps) {
  return (
    <div className={`${style.icon} ${props.loading ? style.loading : style[props.status as Status]}`}>
      <i className='material-icons'>{statusIcons[props.status]}</i>
    </div>
  );
}

export default StatusIcon;
