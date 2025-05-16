import { EncryptionKey, KeyEncryption, Logger } from '@adorsys-gis/web-auth-core';
import { CoreEncryption, CoreOptions } from './core.encryption';
import { LogEncryption } from './log.encryption';
import { TryCatchEncryption } from './try-catch.encryption';
import * as console from 'node:console';

export class SimpleEncryption implements KeyEncryption {
  protected readonly delegate: KeyEncryption;

  constructor(options?: CoreOptions, logger: Logger = console) {
    const coreEncryption = new CoreEncryption(options, logger);
    const logEncryption = new LogEncryption(coreEncryption, logger);
    this.delegate = new TryCatchEncryption(logEncryption, logger);
  }

  public async encryptData(plaintext: string, key: EncryptionKey): Promise<ArrayBuffer> {
    return this.delegate.encryptData(plaintext, key);
  }

  public async decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string> {
    return this.delegate.decryptData(encrypted, key);
  }

  public async generateKeyFromUserId(userId: ArrayBuffer, salt: Uint8Array): Promise<EncryptionKey> {
    return this.delegate.generateKeyFromUserId(userId, salt);
  }
}
