import { EncryptedKey, EncryptedKeyType, KeyStorage } from '@adorsys-gis/web-auth-core';

export class MemoryStorage implements KeyStorage {
  private readonly memory: Record<string, EncryptedKey<EncryptedKeyType>> = {};

  public async get<T extends EncryptedKeyType>(key: string): Promise<EncryptedKey<T>> {
    const read = this.memory[key];
    if (read === null) {
      return null;
    }

    return read as EncryptedKey<T>;
  }

  public async remove(key: string): Promise<void> {
    delete this.memory[key];
  }

  public async save<T extends EncryptedKeyType>(key: string, data: EncryptedKey<T>): Promise<void> {
    if (!data || !data.data) {
      return await this.remove(key);
    }

    this.memory[key] = data;
  }
}
