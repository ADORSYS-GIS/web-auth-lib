import { EncryptionKey, KeyEncryption, Logger } from '@adorsys-gis/web-auth-core';

export type CoreOptions = {
  ivLength?: number;
  tagLength?: number;
  textEncoder?: TextEncoder;
  textDecoder?: TextDecoder;
};

export class CoreEncryption implements KeyEncryption {
  private readonly tagLength: number;
  private readonly ivLength: number;
  private readonly textEncoder: TextEncoder;
  private readonly textDecoder: TextDecoder;

  constructor(
    options: CoreOptions = {},
    protected readonly logger: Logger,
  ) {
    this.ivLength = options.ivLength ?? 12;
    this.tagLength = options.tagLength ?? 128;
    this.textEncoder = options.textEncoder ?? new TextEncoder();
    this.textDecoder = options.textDecoder ?? new TextDecoder();
  }

  public async decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string> {
    const combined = new Uint8Array(encrypted);
    const iv = combined.slice(0, this.ivLength);
    this.logger.debug(`decrypt iv`, iv);

    const ciphertext = combined.slice(this.ivLength);
    this.logger.debug(`decrypt ciphertext`, ciphertext);

    const plaintextBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: this.tagLength, // Specify tag length
      },
      key.key,
      ciphertext,
    );
    return this.textDecoder.decode(plaintextBuffer);
  }

  public async encryptData(plaintext: string, key: EncryptionKey): Promise<ArrayBuffer> {
    const data = this.textEncoder.encode(plaintext);

    // Generate a unique IV for each encryption.
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
    this.logger.debug(`Created iv`, iv);

    const ciphertext = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        tagLength: this.tagLength, // Specify tag length
      },
      key.key,
      data,
    );
    this.logger.debug(`Encrypted ciphertext`, ciphertext);

    // Prepend IV to ciphertext.
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(ciphertext), iv.length);
    return combined.buffer;
  }

  public async generateKeyFromUserId(userId: ArrayBuffer, salt: Uint8Array): Promise<EncryptionKey> {
    // Use PBKDF2 to derive a secure key from the userId
    const baseKey = await crypto.subtle.importKey('raw', userId, { name: 'PBKDF2' }, false, [
      'deriveBits',
      'deriveKey',
    ]);

    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: this.textEncoder.encode("I'm a small rabbit"),
        iterations: 100_000,
        hash: 'SHA-256',
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt'],
    );

    return { key: derivedKey };
  }
}
