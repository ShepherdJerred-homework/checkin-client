import App from '../App';
import { wsApiUrl } from '../config';
import { Action, addAlert, removeHighlight } from '../store/Action';
import { Message, requestLoadStudents } from './Message';

export class BackEnd {
  socket?: WebSocket;

  connected = false;

  highlightId = 0;

  initCommunication() {
    const connect = () => {
      if (! this.socket) {
        const socket = new WebSocket(wsApiUrl);
        socket.onopen = event => {
          this.socket = socket;
          this.sendMessage(requestLoadStudents());
          if (this.connected) {
            App.store.dispatch(addAlert('success', 'socketconnect', 'Server connection established'));
          }
          this.connected = true;
        };
        socket.onmessage = event => {
          this.handleAction(event.data);
        };
        socket.onclose = event => {
          if (this.connected) {
            App.store.dispatch(addAlert('danger', 'socketclose', 'Server connection was closed'));
          }
          else {
            App.store.dispatch(addAlert('danger', 'connectfail', 'Unable to connect to server'));
          }
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
      switch (action.type) {
        case 'ServerUpdateStudentStatus':
          action.highlightId = ++this.highlightId;
          setTimeout(() => App.store.dispatch(removeHighlight(action.studentId, action.highlightId)), 1000);
          break;
      }
      App.store.dispatch(action);
    }
    catch (err) {
      App.logger.log(err);
    }

  }

  sendMessage(msg: Message) {
    if (this.socket) {
      this.socket.send(JSON.stringify(msg));
    }
    else {
      App.logger.error(new Error('Attempt to send message before communications have been initiated'));
    }
  }
}

export default BackEnd;
