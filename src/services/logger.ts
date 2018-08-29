
export interface Logger {
  log(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
}

let logger: Logger = console;
const loggerList: Logger[] = [ console ];

export function log(message?: any, ...optionalParams: any[]): void;
export function log() {
  logger.log(...arguments);
}

export function warn(message?: any, ...optionalParams: any[]): void;
export function warn() {
  logger.warn(...arguments);
}

export function error(message?: any, ...optionalParams: any[]): void;
export function error() {
  logger.log(...arguments);
}

export function push(newLogger: Logger): void {
  loggerList.push(newLogger);
  logger = newLogger;
}

export function pop(): Logger {
  if (loggerList.length > 1) {
    logger = loggerList[loggerList.length - 2];
    return loggerList.pop()!;
  }
  else {
    return logger;
  }
}
