import {EncryptionKey} from "./key";

export interface KeyEncryption {
    /**
     * To encrypt data and get a chain of character
     * 
     * @param plaintext text to be encrypted
     * @param key used to encrypt data
     */
    encryptData(plaintext: string, key: EncryptionKey): Promise<ArrayBuffer>;

    /**
     * 
     * @param encrypted
     * @param key
     */
    decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string>;
}