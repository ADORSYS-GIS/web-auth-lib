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
  rawCredential: PublicKeyCredential;
  credentialId: ArrayBuffer;
}

export interface CredentialAssertion {
  rawCredential: PublicKeyCredential;
  userHandle: ArrayBuffer;
}

export type CredentialUser = Partial<Omit<PublicKeyCredentialUserEntity, 'id'>>;
