import { EncryptedKey, EncryptedKeyType, KeyStorage, Logger } from '@adorsys-gis/web-auth-core';

export class TryCatchDelegate implements KeyStorage {
  constructor(
    private readonly delegate: KeyStorage,
    private readonly logger: Logger,
  ) {}

  public async get<T extends EncryptedKeyType>(key: string): Promise<EncryptedKey<T>> {
    try {
      return await this.delegate.get<T>(key);
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  public async remove(key: string): Promise<void> {
    try {
      return await this.delegate.remove(key);
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  public async save<T extends EncryptedKeyType>(key: string, data: EncryptedKey<T>): Promise<void> {
    try {
      return await this.delegate.save<T>(key, data);
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
