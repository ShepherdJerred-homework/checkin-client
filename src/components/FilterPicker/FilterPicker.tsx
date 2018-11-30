import * as React from 'react';
import { Filter, filterNames, filterOrder, FilterSet } from '../../store/Filter';
import { bindMethods, Dictionary } from '../../util';
import * as style from '../Backdrop/Backdrop.mod.scss';

interface FilterPickerProps {
  filters: FilterSet;
  onSelect: (filters?: FilterSet) => void;
}

interface FilterPickerState {
  filters: FilterSet;
  classErrorTimeout?: number;
  nameErrorTimeout?: number;
}

export default class FilterPicker extends React.PureComponent<FilterPickerProps, FilterPickerState> {

  constructor(props: FilterPickerProps) {
    super(props);

    this.state = {
      filters: {...props.filters},
    };

    bindMethods(this, 'onDone', 'onClick');
  }

  onClick(event: React.MouseEvent) {
    const id = event.currentTarget.id as Filter;
    const filters = { ...this.state.filters, [id]: ! this.state.filters[id] };
    let nameErrorTimeout = this.state.nameErrorTimeout;
    let classErrorTimeout = this.state.classErrorTimeout;
    if (! (filters.a_m || filters.n_z)) {
      filters[id] = true;
      if (nameErrorTimeout) {
        window.clearTimeout(this.state.nameErrorTimeout);
      }
      nameErrorTimeout = window.setTimeout(() => { this.setState({ nameErrorTimeout: undefined }); });
    }
    if (! (filters.twos || filters.threes || filters.fours || filters.kinder)) {
      filters[id] = true;
      if (classErrorTimeout) {
        window.clearTimeout(classErrorTimeout);
      }
      classErrorTimeout = window.setTimeout(() => { this.setState({ classErrorTimeout: undefined }); });
    }
    this.setState({ filters, nameErrorTimeout, classErrorTimeout });
  }

  onDone() {
    let same = true;
    for (const item of filterOrder) {
      if (this.state.filters[item] !== this.props.filters[item]) {
        same = false;
      }
    }
    if (same) {
      this.props.onSelect();
    }
    else {
      this.props.onSelect(this.state.filters);
    }
  }

  filterClassName(filter: Filter): string {
    if (filter === 'a_m' || filter === 'n_z') {
      if (this.state.nameErrorTimeout) {
        return 'list-group-item list-group-item-action list-group-item-danger';
      }
      else {
        return 'list-group-item list-group-item-action';
      }
    }
    else {
      if (this.state.classErrorTimeout) {
        return 'list-group-item list-group-item-action list-group-item-danger';
      }
      else {
        return 'list-group-item list-group-item-action';
      }
    }
  }

  render() {

    return (
      <section data-tag='filter-picker-backdrop' className={style.backdrop}>
        <div className='list-group'>
          <div className={`list-group-item list-group-item-secondary ${style.header}`}>
            <div className={style.text}>
              Select Groups to View
            </div>
            <div className={style.close} onClick={() => this.props.onSelect()}>
              <i className='material-icons'>close</i>
            </div>
          </div>
          {
            filterOrder.map(filter =>
              <div
                className={this.filterClassName(filter)}
                key={filter}
                id={filter}
                onClick={this.onClick}
              >
                {
                  this.state.filters[filter] ?
                    <i className='material-icons' style={{ marginRight: '0.75rem' }}>check_box</i> :
                    <i className='material-icons' style={{ marginRight: '0.75rem' }}>check_box_outline_blank</i>
                }
                {filterNames[filter]}
              </div>
            )
          }
          <div className={`list-group-item list-group-item-secondary ${style.buttonRow}`}>
            <button className='btn btn-primary' onClick={this.onDone}>Done</button>
          </div>
        </div>
      </section>
    );

  }

}
