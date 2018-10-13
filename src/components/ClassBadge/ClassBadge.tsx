import * as React from 'react';
import { ClassTag } from '../../store/Class';
import { Dictionary } from '../../util';
import * as style from './ClassBadge.mod.scss';

const classBadges: Dictionary<string> = {
  twos: '2',
  threes: '3',
  fours: '4',
  kinder: 'K',
};

interface ClassBadgeProps {
  classTag: ClassTag;
}

export default function ClassBadge(props: ClassBadgeProps) {
  return (
    <div className={
      `badge badge-dark ${style.badge} ${style[props.classTag as 'twos' | 'threes' | 'fours' | 'kinder']}`
      }>
    {
      classBadges[props.classTag]
    }
    </div>
  );
}
