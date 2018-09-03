import App from '../App';
import { wsApiUrl } from '../config';
import { Action } from '../store/Action';
import { Message, requestLoadStudents } from './Message';

export class BackEnd {
  socket?: WebSocket;

  initCommunication() {
    const socket = new WebSocket(wsApiUrl);
    socket.onopen = event => {
      this.socket = socket;
      this.sendMessage(requestLoadStudents());
    };
    socket.onmessage = event => {
      try {
        const action: Action = JSON.parse(event.data);
        App.logger.log('BackEnd message', action);
        App.store.dispatch(action);
      }
      catch (err) {
        App.logger.log(err);
      }
    };
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
