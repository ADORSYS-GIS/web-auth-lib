import { EncryptedKey, EncryptedKeyType, KeyStorage } from '@adorsys-gis/web-auth-core';

export class IdxDbStorage implements KeyStorage {
  public async get<T extends EncryptedKeyType>(key: string): Promise<EncryptedKey<T>> {
    throw new Error('Method not implemented.');
  }

  public async remove(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async save<T extends EncryptedKeyType>(key: string, data: EncryptedKey<T>): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
