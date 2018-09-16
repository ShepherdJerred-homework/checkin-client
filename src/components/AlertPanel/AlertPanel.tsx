import $ from 'jquery';
import * as React from 'react';
import * as Redux from 'react-redux';
import App from '../../App';
import { removeAlert } from '../../store/Action';
import Alert from '../../store/Alert';
import State from '../../store/State';
import * as style from './AlertPanel.mod.scss';

interface AlertPanelProps {
  alerts: Alert[];
}

const dismissAlert = (alert: Alert) => (event: React.MouseEvent<HTMLButtonElement>) => {
  $(event.target as HTMLButtonElement)
    .parent()
    .animate({ opacity: 0 }, 'fast', () => {
      App.store.dispatch(removeAlert(alert.id));
    });
};

function AlertPanelWithStore(props: AlertPanelProps) {
  return (
    <section className={style.alertPanel}>
    {
      props.alerts.slice(-5).map(alert =>
        <div className={`alert alert-${alert.type}`} key={alert.id}>
          {
            alert.count > 1 ?
              <span className={`badge badge-${alert.type} badge-pill`}>{alert.count}</span> :
              undefined
          }
          {alert.message}
          <button className='alert-link'
            onClick={dismissAlert(alert)}
          >&times;</button>
        </div>
      )
    }
    </section>
  );
}

function mapStateToProps(state: State) {
  return {
    alerts: state.alerts,
  };
}

export const AlertPanel = Redux.connect(mapStateToProps)(AlertPanelWithStore);

export default AlertPanel;
