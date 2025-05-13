import {EncryptionKey, KeyEncryption, Logger} from "@adorsys-gis/web-auth-core";

export class TryCatchEncryption implements KeyEncryption {
    constructor(
        protected readonly delegate: KeyEncryption,
        private readonly logger: Logger,
    ) {
    }

    public async decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string> {
        try {
            return await this.delegate.decryptData(encrypted, key);
        } catch (error) {
            this.logger.error(error);
            return Promise.reject(error);
        }
    }

    public async encryptData(plaintext: string, key: EncryptionKey): Promise<ArrayBuffer> {
        try {
            return await this.delegate.encryptData(plaintext, key);
        } catch (error) {
            this.logger.error(error);
            return Promise.reject(error);
        }
    }

    public async deriveKey(prfOutput: Uint8Array, salt: Uint8Array): Promise<EncryptionKey> {
        try {
            return await this.delegate.deriveKey(prfOutput, salt);
        } catch (error) {
            this.logger.error(error);
            return Promise.reject(error);
        }
    }
}