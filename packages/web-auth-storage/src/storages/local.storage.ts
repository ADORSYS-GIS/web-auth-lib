import {EncryptedKey, EncryptedKeyType, KeyStorage} from "@adorsys-gis/web-auth-core";
import {decode, encode} from "base64-arraybuffer";

export class LocalStorage implements KeyStorage {
    public async get<T extends EncryptedKeyType>(key: string): Promise<EncryptedKey<T>> {
        const kString = localStorage.getItem(key);
        if (kString === null) {
            return null;
        }
        
        const read = JSON.parse(kString) as EncryptedKey<T>;
        if (typeof read.data === 'string' && read.data.startsWith('buffer:')) {
            const encodedData = read.data.split(':')[1];
            const value = decode(encodedData);
            read.data = value as T;
        }
        
        return read;
    }

    public async remove(key: string): Promise<void> {
        return localStorage.removeItem(key);
    }

    public async save<T extends EncryptedKeyType>(key: string, data: EncryptedKey<T>): Promise<void> {
        if (!data || !data.data) {
            return await this.remove(key);
        }

        if (typeof data.data !== "string") {
            const encodedData = encode(data.data);
            return await this.save(key, {data: `buffer:${encodedData}`});
        }

        return localStorage.setItem(key, JSON.stringify(data));
    }

}