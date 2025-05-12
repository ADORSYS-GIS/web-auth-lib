export interface EncryptionKey {
    key: CryptoKey;
}

export type EncryptedKeyType = string | ArrayBuffer;

export interface EncryptedKey<Type extends EncryptedKeyType> {
    data: Type;
}

export interface Notification<T> {
    data?: T;
}