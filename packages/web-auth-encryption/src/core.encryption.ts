import {EncryptionKey, KeyEncryption} from "@adorsys-gis/web-auth-core";

export type CoreOptions = {
    ivLength?: number;
    textEncoder?: TextEncoder;
    textDecoder?: TextDecoder;
};

export class CoreEncryption implements KeyEncryption {
    private readonly ivLength: number;
    private readonly textEncoder: TextEncoder;
    private readonly textDecoder: TextDecoder;

    constructor(
        options: CoreOptions = {
            ivLength: 12,
        },
    ) {
        this.ivLength = options.ivLength ?? 12;
        this.textEncoder = options.textEncoder ?? new TextEncoder();
        this.textDecoder = options.textDecoder ?? new TextDecoder();
    }
    
    public async decryptData(encrypted: ArrayBuffer, key: EncryptionKey): Promise<string> {
        const combined = new Uint8Array(encrypted);
        const iv = combined.slice(0, this.ivLength);
        const ciphertext = combined.slice(this.ivLength);
        const plaintextBuffer = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv
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
        const ciphertext = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key.key,
            data,
        );

        // Prepend IV to ciphertext.
        const combined = new Uint8Array(iv.length + ciphertext.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(ciphertext), iv.length);
        return combined.buffer;
    }

    public async deriveKey(prfOutput: Uint8Array, salt: Uint8Array): Promise<EncryptionKey> {
        const baseKey = await crypto.subtle.importKey(
            "raw",
            prfOutput,
            { name: "HKDF" },
            false,
            ["deriveKey"],
        );

        const derivedKey = await crypto.subtle.deriveKey(
            {
                name: "HKDF",
                hash: "SHA-256",
                salt: salt,
                info: crypto.getRandomValues(new Uint8Array(16)),
            },
            baseKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"],
        );

        return { key: derivedKey };
    }
}