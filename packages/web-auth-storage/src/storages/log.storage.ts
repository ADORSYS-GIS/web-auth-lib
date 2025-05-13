import {EncryptedKey, EncryptedKeyType, KeyStorage, Logger} from "@adorsys-gis/web-auth-core";

export class LogDelegate implements KeyStorage {
    public constructor(
        private readonly delegate: KeyStorage,
        private readonly logger: Logger,
    ) {
    }

    public async get<T extends EncryptedKeyType>(key: string): Promise<EncryptedKey<T>> {
        this.logger.debug('About to get', key);
        const result = await this.delegate.get<T>(key);
        this.logger.debug('Got', key, result?.data);
        return result;
    }

    public async remove(key: string): Promise<void> {
        this.logger.debug('About to removed', key);
        const result = await this.delegate.remove(key);
        this.logger.debug('removed', key);
        return result;
    }

    public async save<T extends EncryptedKeyType>(key: string, data: EncryptedKey<T>): Promise<void> {
        this.logger.debug('About to saved', key);
        const result = await this.delegate.save<T>(key, data);
        this.logger.debug('Saved', key);
        return result;
    }
}