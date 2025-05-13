import { EncryptionKey } from "./keyDerivationService";

export interface LocalDB {
  encryptData(plaintext: string, key: EncryptionKey): Promise<ArrayBuffer>;
  decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string>;
}

export class LocalDBService implements LocalDB {
  async encryptData(
    plaintext: string,
    key: EncryptionKey,
  ): Promise<ArrayBuffer> {
    try {
      
    } catch (error) {
      throw new Error(`Encryption error: ${(error as Error).message}`);
    }
  }

  async decryptData(
    encrypted: ArrayBuffer,
    key: EncryptionKey,
  ): Promise<string> {
    try {
      
    } catch (error) {
      throw new Error(`Decryption error: ${(error as Error).message}`);
    }
  }
}
