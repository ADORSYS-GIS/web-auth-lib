import {EncryptionKey, KeyEncryption, Logger} from "@adorsys-gis/web-auth-core";

export class LogEncryption implements KeyEncryption {
    constructor(
        protected readonly delegate: KeyEncryption,
        private readonly logger: Logger,
    ) {
    }

    public async decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string> {
        this.logger.debug('Decrypting', key, encrypted);
        const result = await this.delegate.decryptData(encrypted, key);
        this.logger.debug('Decrypted', key, result);
        return result;
    }

    public async encryptData(plaintext: string, key: EncryptionKey): Promise<ArrayBuffer> {
        this.logger.debug('Encrypting', key, plaintext);
        const result = await this.delegate.encryptData(plaintext, key);
        this.logger.debug('Encrypted', key, result);
        return result;
    }

    public async deriveKey(prfOutput: Uint8Array, salt: Uint8Array): Promise<EncryptionKey> {
        this.logger.debug('Will derive Key', salt, prfOutput);
        const result = await this.delegate.deriveKey(prfOutput, salt);
        this.logger.debug('Done derivating Key', salt, result);
        return result;
    }
}