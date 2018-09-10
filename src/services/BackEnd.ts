import App from '../App';
import { wsApiUrl } from '../config';
import { Action, removeHighlight } from '../store/Action';
import { Message, requestLoadStudents } from './Message';

export class BackEnd {
  socket?: WebSocket;

  initCommunication() {
    let highlightId = 1;
    const socket = new WebSocket(wsApiUrl);
    socket.onopen = event => {
      this.socket = socket;
      this.sendMessage(requestLoadStudents());
    };
    socket.onmessage = event => {
      try {
        const action: Action = JSON.parse(event.data);
        switch (action.type) {
          case 'ServerUpdateStudentStatus':
            action.highlightId = highlightId++;
            setTimeout(() => App.store.dispatch(removeHighlight(action.studentId, action.highlightId)), 1000);
            break;
        }
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
