import {EncryptedKey, EncryptedKeyType} from "./key";

export interface KeyStorage {
    /**
     *
     * @param key
     * @param data
     */
    save<T extends EncryptedKeyType>(key: string, data: EncryptedKey<T>): Promise<void>;

    /**
     *
     * @param key
     */
    get<T extends EncryptedKeyType>(key: string): Promise<EncryptedKey<T>>;

    /**
     *
     * @param key
     */
    remove(key: string): Promise<void>;
}