
export interface RequestLoadStudents {
  type: 'RequestLoadStudents';
}

export function requestLoadStudents(): RequestLoadStudents {
  return {
    type: 'RequestLoadStudents',
  };
}

export type Message = RequestLoadStudents;

export default Message;
