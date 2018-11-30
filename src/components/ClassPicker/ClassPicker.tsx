import * as React from 'react';
import App from '../../App';
import { classNames, ClassTag, classTags } from '../../store/Class';
import * as style from './ClassPicker.mod.scss';

interface ClassPickerProps {
  classTag?: ClassTag;
  onSelect: (classTag?: ClassTag) => void;
}

export default function ClassPicker(props: ClassPickerProps) {
  function classClassName(classTag: ClassTag) {
    if (classTag === props.classTag) {
      return 'list-group-item list-group-item-action list-group-item-primary';
    }
    else {
      return 'list-group-item list-group-item-action';
    }
  }

  const onClassClick = (classTag: ClassTag) => () => {
    if (classTag === props.classTag) {
      props.onSelect();
    }
    else {
      props.onSelect(classTag);
    }
  };

  return (
    <section data-tag='class-picker-backdrop' className={style.backdrop}>
      <div className='list-group'>
        <div className={`list-group-item list-group-item-secondary ${style.header}`}>
          <div className={style.text}>
            Select Classes
          </div>
          <div className={style.close} onClick={() => props.onSelect()}>
            <i className='material-icons'>close</i>
          </div>
        </div>
        {
          classTags.map(tag =>
            <div key={tag} className={classClassName(tag)} onClick={onClassClick(tag)}>
              <div className={style.text}>
                {classNames[tag]}
              </div>
              {
                tag !== 'all' &&
                  <App.ClassBadge classTag={tag}/>
              }
            </div>
          )
        }
      </div>
    </section>
  );
}
