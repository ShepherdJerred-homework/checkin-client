
export const apiHost = window.location.hostname;

export const apiPort = 8000;

export const studentApiPath = 'api/students/';

export const studentApiUrl  = `http://${apiHost}:${apiPort}/${studentApiPath}`;

export const classApiPath = 'api/classes';

export const classApiUrl  = `http://${apiHost}:${apiPort}/${classApiPath}`;

export const wsApiPath = 'ws/checkin';

export const wsApiUrl = `ws://${apiHost}:${apiPort}/${wsApiPath}`;
