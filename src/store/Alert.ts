
export type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface Alert {
  id: number;
  type: AlertType;
  message: string;
}

export default Alert;
