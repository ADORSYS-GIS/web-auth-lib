import {CoreOptions, SimpleEncryption} from "@adorsys-gis/web-auth-encryption";
import {loggerFactory, LoggerFactoryOptions, LogLevel} from "@adorsys-gis/web-auth-logger";
import {keyStorageFactory, KeyStorageFactoryOptions} from "@adorsys-gis/web-auth-storage";
import {CoreCredentialOptions, SimpleCredential} from "@adorsys-gis/web-auth-credential";
import {Credential, KeyEncryption, KeyStorage, Logger} from "@adorsys-gis/web-auth-core";

export interface WebAuthOption {
    credentialOptions: CoreCredentialOptions;
    encryptionOptions?: CoreOptions;
    storageOptionType?: KeyStorageFactoryOptions['type'];
    loggerType?: LoggerFactoryOptions['type'];

    /**
     * Ignored if 
     */
    logLevel?: LogLevel;
}

export function webAuth({
                                  logLevel: logLevel = LogLevel.log,
                                  loggerType = 'level',
                                  credentialOptions,
                                  encryptionOptions,
                                  storageOptionType = 'simple',
                              }: WebAuthOption) {
    const logger: Logger = loggerFactory({type: loggerType, logLevel});
    const storage: KeyStorage = keyStorageFactory({logger, type: storageOptionType});
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