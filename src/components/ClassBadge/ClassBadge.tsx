import * as React from 'react';
import { classBadges, ExactClassTag } from '../../store/Class';
import * as style from './ClassBadge.mod.scss';

interface ClassBadgeProps {
  classTag: ExactClassTag;
}

export default function ClassBadge(props: ClassBadgeProps) {
  return (
    <div className={
      `badge badge-dark ${style.badge} ${style[props.classTag]}`
      }>
    {
      classBadges[props.classTag]
    }
    </div>
  );
}
