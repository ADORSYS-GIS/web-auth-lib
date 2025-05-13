import {EncryptedKey, EncryptedKeyType, KeyStorage, Logger} from "@adorsys-gis/web-auth-core";
import {TryCatchDelegate} from "./try-catch.storage";
import {LogDelegate} from "./log.storage";

export abstract class AbstractKeyStorage implements KeyStorage {
    private readonly delegate: KeyStorage;

    protected constructor(
        protected readonly prefix: string,
        logger: Logger,
        delegate: KeyStorage,
    ) {
        const logDelegate = new LogDelegate(delegate, logger);
        this.delegate = new TryCatchDelegate(logDelegate, logger)
    }

    get<T extends EncryptedKeyType>(key: string): Promise<EncryptedKey<T>> {
        return this.delegate.get<T>(`${this.prefix}${key}`)
    }

    remove(key: string): Promise<void> {
        return this.delegate.remove(`${this.prefix}${key}`);
    }

    save<T extends EncryptedKeyType>(key: string, data: EncryptedKey<T>): Promise<void> {
        return this.delegate.save<T>(`${this.prefix}${key}`, data);
    }
}