import {Logger} from "@adorsys-gis/web-auth-core";

export class SimpleLogger implements Logger {
    constructor(
        private readonly logger: Logger = console,
        private readonly prefix: string = '[web-auth] ',
    ) {
    }

    info(...args: any[]): any {
        const [first, ...value] = args;
        return this.logger.info(`${this.prefix}${first}`, ...value);
    }

    debug(...args: any[]): any {
        const [first, ...value] = args;
        return this.logger.debug(`${this.prefix}${first}`, ...value);
    }

    error(...args: any[]): any {
        const [first, ...value] = args;
        return this.logger.error(`${this.prefix}${first}`, ...value);
    }

    log(...args: any[]): any {
        const [first, ...value] = args;
        return this.logger.log(`${this.prefix}${first}`, ...value);
    }

    trace(...args: any[]): any {
        const [first, ...value] = args;
        return this.logger.trace(`${this.prefix}${first}`, ...value);
    }

}