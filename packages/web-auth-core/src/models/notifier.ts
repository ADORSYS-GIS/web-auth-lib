import {Notification} from "./key";

export interface KeyNotifier {
    /**
     *
     * @param event
     * @param handler
     * @param args
     */
    on<T = unknown>(event: string, handler: (data?: Notification<T>) => void, ...args: any[]): Promise<void>;


    /**
     * 
     * @param event
     * @param handler
     * @param args
     */
    off<T = unknown>(event: string, handler: (data?: Notification<T>) => void, ...args: any[]): Promise<void>;

    /**
     * 
     * @param event
     * @param data
     * @param args
     */
    emit<T = unknown>(event: string, data?: Notification<T>, ...args: any[]): Promise<void>;
    emit<T = unknown>(event: string, data?: T, ...args: any[]): Promise<void>;
}