import {EncryptionKey, KeyEncryption, Logger} from "@adorsys-gis/web-auth-core";
import {CoreEncryption, CoreOptions} from "./core.encryption";
import {LogEncryption} from "./log.encryption";
import {TryCatchEncryption} from "./try-catch.encryption";
import * as console from "node:console";

export class SimpleEncryption implements KeyEncryption {
    protected readonly delegate: KeyEncryption;

    constructor(
        options?: CoreOptions,
        logger: Logger = console,
    ) {
        const coreEncryption = new CoreEncryption(options);
        const logEncryption = new LogEncryption(coreEncryption, logger);
        this.delegate = new TryCatchEncryption(logEncryption, logger);
    }

    encryptData(plaintext: string, key: EncryptionKey): Promise<ArrayBuffer> {
        return this.delegate.encryptData(plaintext, key);
    }

    decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string> {
        return this.delegate.decryptData(encrypted, key);
    }

    deriveKey(prfOutput: Uint8Array, salt: Uint8Array): Promise<EncryptionKey> {
        return this.delegate.deriveKey(prfOutput, salt);
    }

}