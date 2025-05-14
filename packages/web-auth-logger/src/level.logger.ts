import {Logger} from "@adorsys-gis/web-auth-core";

export const LogLevel = {
    trace: 0,
    debug: 1,
    log: 2,
    info: 3,
    error: 4,
}

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];

export class LevelLogger implements Logger {
    constructor(
        private readonly delegate: Logger = console,
        protected readonly minLogLevel: LogLevel = LogLevel.log
    ) {
    }

    public async info(...args: any[]): Promise<void> {
        if (this.minLogLevel >= LogLevel.info) {
            return;
        }

        return this.delegate.info(...args);
    }

    public async debug(...args: any[]): Promise<void> {
        if (this.minLogLevel >= LogLevel.debug) {
            return;
        }

        return this.delegate.debug(...args);
    }

    public async error(...args: any[]): Promise<void> {
        if (this.minLogLevel >= LogLevel.error) {
            return;
        }

        return this.delegate.error(...args);
    }

    public async log(...args: any[]): Promise<void> {
        if (this.minLogLevel >= LogLevel.log) {
            return;
        }

        return this.delegate.log(...args);
    }

    public async trace(...args: any[]): Promise<void> {
        if (this.minLogLevel >= LogLevel.trace) {
            return;
        }

        return this.delegate.trace(...args);
    }

}