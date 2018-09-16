
export type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface Alert {
  id: number;
  type: AlertType;
  tag: string;
  count: number;
  message: string;
}

export default Alert;
