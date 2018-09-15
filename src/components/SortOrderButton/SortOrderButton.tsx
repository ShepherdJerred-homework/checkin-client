import * as React from 'react';
import SortCriterion, { criteriaNames } from '../../store/SortCriterion';
import { bindMethods } from '../../util';
import * as style from '../ClassChooser/ClassChooser.mod.scss';

interface SortOrderProps {
  initial: SortCriterion[];
  onClose: (result?: SortCriterion[]) => void;
}

interface SortOrderState {
  criteria: SortCriterion[];
  order: SortCriterion[];
  current?: SortCriterion;
  currentTimer?: number;
}

export class SortOrderButton extends React.PureComponent<SortOrderProps, SortOrderState> {

  constructor(props: SortOrderProps) {
    super(props);

    this.state = {
      criteria: [ 'firstName', 'lastName', 'class', 'status' ],
      order: props.initial,
    };

    bindMethods(this, 'click');
  }

  buttonClass(criterion: SortCriterion) {
    const classes = [ 'list-group-item', 'list-group-item-action' ];
    if (criterion === this.state.current) {
      classes.push('list-group-item-primary');
    }
    return classes.join(' ');
  }

  click(event: React.MouseEvent) {
    const id = event.currentTarget.id as SortCriterion;
    if (this.state.order.indexOf(id) > 0) {
      const order = this.state.order.filter(criterion => criterion !== id);
      order.unshift(id);
      if (this.state.currentTimer) {
        window.clearTimeout(this.state.currentTimer);
      }
      const timer = window.setTimeout(() => {
        this.setState({ current: undefined, currentTimer: undefined });
      }, 400);
      this.setState({ order, current: id, currentTimer: timer });
    }
  }

  render() {
    const top = (id: SortCriterion) => {
      const a = this.state.criteria.indexOf(id);
      const b = this.state.order.indexOf(id);
      return 47 * (b - a) + 'px';
    };
    return (
      <div className={style.optionOverlay}>
        <div className='list-group'>
          <div className={`list-group-item list-group-item-dark ${style.title}`}>Sort Order</div>
          <div className={style.optionContainer}>
            {
              this.state.criteria.map(criterion =>
                <button
                  key={criterion} id={criterion}
                  className={this.buttonClass(criterion)}
                  style={{ top: top(criterion), height: '48px' }}
                  onClick={this.click}
                >
                  {criteriaNames[criterion]}
                </button>
              )
            }
          </div>
          <div id='btn-row' className={`list-group-item ${style.droppable} ${style.btnRow}`}>
            <button className='btn btn-secondary' onClick={() => this.props.onClose()}>Cancel</button>
            <button className='btn btn-primary' onClick={() => this.props.onClose(this.state.order)}>OK</button>
          </div>
        </div>
      </div>
    );
  }

}

export default SortOrderButton;
