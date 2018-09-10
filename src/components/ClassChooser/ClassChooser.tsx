import * as React from 'react';
import { classNames, ClassTag, classTags } from '../../data/Class';
import * as style from './ClassChooser.mod.scss';

interface ClassChooserProps {
  initial: ClassTag;
  onClose: (result?: ClassTag) => void;
}

interface ClassChooserState {
  current: ClassTag;
}

export class ClassChooser extends React.PureComponent<ClassChooserProps, ClassChooserState> {
  constructor(props: ClassChooserProps) {
    super(props);
    this.state = {
      current: props.initial,
    };
  }

  buttonClass(result: ClassTag) {
    const classes = [ 'list-group-item', 'list-group-item-action' ];
    if (result === this.state.current) {
      classes.push('list-group-item-primary');
    }
    return classes.join(' ');
  }

  selectClass(result: ClassTag) {
    this.setState({ current: result });
  }

  render() {
    return (
      <div className={`${style.classChooser}`}>
        <div className='list-group'>
          <div className={`list-group-item list-group-item-dark ${style.title}`}>Select Class</div>
          {
            classTags.map(tag =>
              <button className={this.buttonClass(tag)} onClick={() => this.selectClass(tag)}>
                {classNames[tag]}
              </button>
            )
          }
          <div className={`list-group-item ${style.btnRow}`}>
            <button className='btn btn-secondary' onClick={() => this.props.onClose()}>Cancel</button>
            <button className='btn btn-primary' onClick={() => this.props.onClose(this.state.current)}>OK</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassChooser;
