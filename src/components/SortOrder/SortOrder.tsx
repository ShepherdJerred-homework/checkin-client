import $ from 'jquery';
import * as React from 'react';
import SortCriterion, { criteriaNames, sortCriteria } from '../../store/SortCriterion';
import { bindMethods, Maybe } from '../../util';
import * as style from '../ClassChooser/ClassChooser.mod.scss';

interface SortOrderProps {
  initial: SortCriterion[];
  onClose: (result?: SortCriterion[]) => void;
}

interface SortOrderState {
  order: SortCriterion[];
  moving?: SortCriterion;
  touchId?: number;
}

export class SortOrder extends React.PureComponent<SortOrderProps, SortOrderState> {

  listGroupRef: React.RefObject<HTMLDivElement>;

  constructor(props: SortOrderProps) {
    super(props);

    this.listGroupRef = React.createRef();

    this.state = {
      order: props.initial,
    };

    bindMethods(this);
  }

  reorder(onTopOf: SortCriterion) {
    if (this.state.moving && this.state.moving !== onTopOf) {
      const pos = this.state.order.indexOf(onTopOf);
      const updated = this.state.order.filter(criterion => criterion !== this.state.moving);
      updated.splice(pos, 0, this.state.moving);
      this.setState({ order: updated });
    }
  }

  click(event: React.MouseEvent) {
    this.setState({ moving: event.currentTarget.id as SortCriterion });
  }

  dragStart(event: React.DragEvent) {
    event.dataTransfer.dropEffect = 'move';
    this.setState({ moving: event.currentTarget.id as SortCriterion });
  }

  dragEnter(event: React.DragEvent) {
    if (this.state.moving) {
      const movingPos = this.state.order.indexOf(this.state.moving);
      const targetPos = this.state.order.indexOf(event.currentTarget.id as SortCriterion);
      if (movingPos > targetPos) {
        event.currentTarget.classList.add(style.aboveTarget);
      }
      else {
        event.currentTarget.classList.add(style.belowTarget);
      }
    }
  }

  dragLeave(event: React.DragEvent) {
    event.currentTarget.classList.remove(style.aboveTarget);
    event.currentTarget.classList.remove(style.belowTarget);
  }

  dragOver(event: React.DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  drop(event: React.DragEvent) {
    event.currentTarget.classList.remove(style.aboveTarget);
    event.currentTarget.classList.remove(style.belowTarget);
    this.reorder(event.currentTarget.id as SortCriterion);
  }

  divClass(criterion: SortCriterion) {
    const classes = [
      'list-group-item',
      style.draggable,
      style.droppable,
    ];
    if (criterion === this.state.moving) {
      classes.push('list-group-item-primary');
    }
    return classes.join(' ');
  }

  touchStart(event: React.TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ moving: event.currentTarget.id as SortCriterion });
    if (!this.state.touchId) {
      this.setState({ touchId: event.targetTouches[0].identifier });
    }
    $(window).on('touchmove', this.noScrolling);
    $(document.body).on('touchmove', this.noScrolling);
  }

  touchMove(event: React.TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    let touch: Maybe<React.Touch>;
    for (let i = 0, l = event.targetTouches.length; i < l; ++i) {
      if (event.targetTouches[i].identifier === this.state.touchId) {
        touch = event.targetTouches[i];
        break;
      }
    }
    const listGroup = this.listGroupRef.current;
    if (touch && listGroup) {
      // console.log('touch', touch.clientY)
      for (let i = 1, l = listGroup.children.length; i < l; ++i) {
        const child = listGroup.children[i] as HTMLElement;
        const clientRect = child.getBoundingClientRect();
        // console.log(child.id, clientRect);
        if (touch.clientY >= clientRect.top && touch.clientY <= clientRect.bottom) {
          this.reorder(child.id as SortCriterion);
          break;
        }
      }
    }
  }

  touchEnd(event: React.TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    let active = false;
    for (let i = 0, l = event.touches.length; i < l; ++i) {
      if (event.touches[i].identifier === this.state.touchId) {
        active = true;
      }
    }
    if (! active) {
      this.setState({ touchId: undefined });
    }
    ($(window) as any).off('touchmove', this.noScrolling);
    ($(document.body) as any).off('touchmove', this.noScrolling);
  }

  noScrolling(event: JQueryEventObject) {
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    return (
      <div className={style.optionOverlay}>
        <div className='list-group' ref={this.listGroupRef}>
          <div className={`list-group-item list-group-item-dark ${style.title}`}>Arrange Sort Order</div>
          {
            this.state.order.map(criterion =>
              <div
                key={criterion} id={criterion}
                className={this.divClass(criterion)}
                draggable={true}
                onClick={this.click}
                onDragStart={this.dragStart}
                onDragEnter={this.dragEnter}
                onDragLeave={this.dragLeave}
                onDragOver={this.dragOver}
                onDrop={this.drop}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
                onTouchCancel={this.touchEnd}
              >
                <i className='material-icons md-dark'>drag_indicator</i>
                {criteriaNames[criterion]}
              </div>
            )
          }
          <div id='btn-row' className={`list-group-item ${style.droppable} ${style.btnRow}`}>
            <button className='btn btn-secondary' onClick={() => this.props.onClose()}>Cancel</button>
            <button className='btn btn-primary' onClick={() => this.props.onClose(this.state.order)}>OK</button>
          </div>
         </div>
      </div>
    );
  }
}

export default SortOrder;
