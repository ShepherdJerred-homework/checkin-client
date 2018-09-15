import * as React from 'react';
import SortCriterion, { criteriaNames, sortCriteria } from '../../store/SortCriterion';
import * as style from '../ClassChooser/ClassChooser.mod.scss';

interface SortOrderProps {
  initial: SortCriterion[];
  onClose: (result?: SortCriterion[]) => void;
}

interface SortOrderState {
  order: SortCriterion[];
}

export class SortOrder extends React.PureComponent<SortOrderProps, SortOrderState> {

  constructor(props: SortOrderProps) {
    super(props);

    this.state = {
      order: props.initial,
    };

    this.dragStart = this.dragStart.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.drop = this.drop.bind(this);
    this.touchStart = this.touchStart.bind(this);
  }

  dragStart(event: React.DragEvent) {
    event.dataTransfer.setData('text/plain', event.currentTarget.id);
    event.dataTransfer.dropEffect = 'move';
  }

  dragEnter(event: React.DragEvent) {
    event.currentTarget.classList.add(style.target);
  }

  dragLeave(event: React.DragEvent) {
    event.currentTarget.classList.remove(style.target);
  }

  dragOver(event: React.DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  drop(event: React.DragEvent) {
    event.currentTarget.classList.remove(style.target);
    const id = event.dataTransfer.getData('text/plain') as SortCriterion;
    if (id !== event.currentTarget.id) {
      const updated = this.state.order.filter(criterion => criterion !== id);
      let pos;
      if (event.currentTarget.id === 'btn-row') {
        pos = updated.length;
      }
      else {
        pos = updated.indexOf(event.currentTarget.id as SortCriterion);
      }
      updated.splice(pos, 0, id);
      this.setState({ order: updated });
    }
  }

  touchStart(event: React.TouchEvent) {

  }

  render() {
    return (
      <div className={style.optionOverlay}>
        <div className='list-group'>
          <div className={`list-group-item list-group-item-dark ${style.title}`}>Arrange Sort Order</div>
          {
            this.state.order.map(criterion =>
              <div
                key={criterion} id={criterion}
                className={`list-group-item list-group-item-action ${style.draggable} ${style.droppable}`}
                draggable={true}
                onDragStart={this.dragStart}
                onDragEnter={this.dragEnter}
                onDragLeave={this.dragLeave}
                onDragOver={this.dragOver}
                onDrop={this.drop}
              >
                <i className='material-icons md-dark'>drag_indicator</i>
                {criteriaNames[criterion]}
              </div>
            )
          }
          <div
            id='btn-row'
            className={`list-group-item ${style.droppable} ${style.btnRow}`}
            onDragEnter={this.dragEnter}
            onDragLeave={this.dragLeave}
            onDragOver={this.dragOver}
            onDrop={this.drop}
          >
            <button className='btn btn-secondary' onClick={() => this.props.onClose()}>Cancel</button>
            <button className='btn btn-primary' onClick={() => this.props.onClose(this.state.order)}>OK</button>
          </div>
         </div>
      </div>
    );
  }
}

export default SortOrder;
