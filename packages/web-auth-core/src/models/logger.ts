export interface Logger {
    log(...args: any[]): any;
    error(...args: any[]): any;
    debug(...args: any[]): any;
    trace(...args: any[]): any;
    info(...args: any[]): any;
}