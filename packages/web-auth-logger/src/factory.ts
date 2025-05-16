import { Logger } from '@adorsys-gis/web-auth-core';
import { SimpleLogger } from './simple.logger';
import { LevelLogger, LogLevel } from './level.logger';

export type LoggerFactoryOptions =
  | {
      type: 'simple';
      logger?: Logger;
      prefix?: string;
    }
  | {
      type: 'level';
      logger?: Logger;
      prefix?: string;
      logLevel?: LogLevel;
    };

export function loggerFactory(options: LoggerFactoryOptions): Logger {
  const type = options.type;
  const logger = options.logger ?? console;
  switch (type) {
    case 'simple':
      return new SimpleLogger(logger, options.prefix);
    case 'level':
      return new LevelLogger(new SimpleLogger(logger, options.prefix));
    default:
      throw new Error('Unknown type "' + type + '"');
  }
}
