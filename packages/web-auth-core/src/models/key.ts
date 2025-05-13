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

export interface RegisterOption {
    user?: CredentialUser;
}

export interface CredentialRegistration {
    credentialId: ArrayBuffer;
    rawCredential: PublicKeyCredential;
}

export interface CredentialAssertion {
    rawCredential: PublicKeyCredential;
    prfResult: Uint8Array;
}

export type CredentialUser = Partial<Omit<PublicKeyCredentialUserEntity, 'id'>>;