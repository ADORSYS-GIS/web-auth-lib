import { EncryptionKey } from './key';

export interface KeyEncryption {
  /**
   * Encrypts data using the provided key
   * @param plaintext Text to be encrypted
   * @param key The encryption key to use
   * @returns Encrypted data as ArrayBuffer
   */
  encryptData(plaintext: string, key: EncryptionKey): Promise<ArrayBuffer>;

  /**
   * Decrypts data using the provided key
   * @param encrypted Encrypted data to decrypt
   * @param key The encryption key to use
   * @returns Decrypted plaintext
   */
  decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string>;

  /**
   * Generates an encryption key from user ID
   * @param userId The user's unique identifier
   * @param salt The salt
   * @returns A derived encryption key
   */
  generateKeyFromUserId(userId: ArrayBuffer, salt: Uint8Array): Promise<EncryptionKey>;
}
