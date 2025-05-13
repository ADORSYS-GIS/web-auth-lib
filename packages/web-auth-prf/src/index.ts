import {CoreOptions, SimpleEncryption} from "@adorsys-gis/web-auth-encryption";
import {SimpleLogger} from "@adorsys-gis/web-auth-logger";
import {SimpleStorage} from "@adorsys-gis/web-auth-storage";
import {CoreCredentialOptions, SimpleCredential} from "@adorsys-gis/web-auth-credential";
import {Credential, KeyEncryption} from "@adorsys-gis/web-auth-core";

export function webAuth(credentialOptions: CoreCredentialOptions, encryptionOptions: CoreOptions = {}) {
    const logger = new SimpleLogger();
    const storage = new SimpleStorage(undefined, logger);
    const encryption: KeyEncryption = new SimpleEncryption(encryptionOptions, logger);
    const credential: Credential = new SimpleCredential(credentialOptions, storage, logger);
    return {
        encryption,
        credential,
        storage,
        logger,
    }
}

export default webAuth;