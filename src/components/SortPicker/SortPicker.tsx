import * as React from 'react';
import SortCriterion, { criteriaNames, sortCriteria } from '../../store/SortCriterion';
import { bindMethods } from '../../util';
import * as style from '../Backdrop/Backdrop.mod.scss';

interface SortPickerProps {
  order: SortCriterion[];
  onSelect: (order?: SortCriterion[]) => void;
}

interface SortPickerState {
  order: SortCriterion[];
  current?: SortCriterion;
  currentTimer?: number;
}

export default class SortPicker extends React.PureComponent<SortPickerProps, SortPickerState> {

  constructor(props: SortPickerProps) {
    super(props);

    this.state = {
      order: props.order,
    };

    bindMethods(this, 'onClick', 'criterionTop', 'onDone');
  }

  onClick(event: React.MouseEvent) {
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

  criterionClassName(criterion: SortCriterion) {
    const classes = [ 'list-group-item', 'list-group-item-action' ];
    if (criterion === this.state.current) {
      return 'list-group-item list-group-item-action list-group-item-primary';
    }
    else {
      return 'list-group-item list-group-item-action';
    }
  }

  criterionTop(criterion: SortCriterion) {
    const i = this.state.order.indexOf(criterion);
    return 64 * i + 'px';
  }

  onDone() {
    let same = true;
    for (let i = 0; i < this.props.order.length; ++i) {
      if (this.state.order[i] !== this.props.order[i]) {
        same = false;
      }
    }
    if (same) {
      this.props.onSelect();
    }
    else {
      this.props.onSelect(this.state.order);
    }
  }

  render() {
    return (
      <section data-tag='sort-picker-backdrop' className={style.backdrop}>
        <div className='list-group'>
          <div className={`list-group-item list-group-item-secondary ${style.header}`}>
            <div className={style.text}>
              Select Sort Order
            </div>
            <div className={style.close} onClick={() => this.props.onSelect()}>
              <i className='material-icons'>close</i>
            </div>
          </div>
          <div className={style.sortBackground}>
          {
              sortCriteria.map(criterion =>
                <div
                  key={criterion}
                  id={criterion}
                  className={this.criterionClassName(criterion)}
                  style={{ position: 'absolute', top: this.criterionTop(criterion) }}
                  onClick={this.onClick}
                >
                  {criteriaNames[criterion]}
                </div>
              )
          }
          </div>
          <div className={`list-group-item list-group-item-secondary ${style.buttonRow}`}>
            <button className='btn btn-primary' onClick={this.onDone}>Done</button>
          </div>
        </div>
      </section>
    );
  }

}
