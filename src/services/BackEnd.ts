import App from '../App';
import { wsApiUrl } from '../config';
import { Action, addAlert, setConnectionStatus } from '../store/Action';
import { Message, requestLoadStudents } from './Message';

export class BackEnd {
  socket?: WebSocket;

  connected = false;

  highlightId = 0;

  queuedMessages: Message[] = [];

  initCommunication() {
    const connect = () => {
      if (! this.socket) {
        const socket = new WebSocket(wsApiUrl);
        socket.onopen = event => {
          this.socket = socket;
          this.sendMessage(requestLoadStudents());
          if (this.connected) {
            App.store.dispatch(addAlert('success', 'socketconnect', 'Server connection established'));
            this.connected = true;
            App.store.dispatch(setConnectionStatus(true));
            this.queuedMessages.forEach(message => {
              this.sendMessage(message);
            })
          }
        };
        socket.onmessage = event => {
          this.handleAction(event.data);
        };
        socket.onclose = event => {
          if (this.connected) {
            App.store.dispatch(addAlert('danger', 'socketclose', 'Server connection closed'));
          } else {
            App.store.dispatch(addAlert('danger', 'connectfail', 'Unable to connect to server'));
          }
          this.connected = false;
          App.store.dispatch(setConnectionStatus(false));
          this.socket = undefined;
        };
      }
    };

    window.setInterval(connect, 2000);
    connect();
  }

  handleAction(data: string) {
    try {
      const action: Action = JSON.parse(data);
      App.store.dispatch(action);
    }
    catch (err) {
      App.logger.log(err);
    }

  }

  sendMessage(msg: Message) {
    if (this.socket) {
      try {
        this.socket.send(JSON.stringify(msg));
        App.store.dispatch(setConnectionStatus(true));
      } catch (err) {
        this.queuedMessages.push(msg);
        App.store.dispatch(setConnectionStatus(false));
      }
    }
    else {
      App.logger.error(new Error('Attempt to send message before communications have been initiated'));
      App.store.dispatch(setConnectionStatus(false));
      this.queuedMessages.push(msg);
    }
  }
}

export default BackEnd;
