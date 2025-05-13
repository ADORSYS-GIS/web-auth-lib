import {
    RegisterOption,
    Credential,
    CredentialAssertion,
    CredentialRegistration,
    KeyStorage,
    Logger
} from "@adorsys-gis/web-auth-core";
import {CoreCredential, CoreCredentialOptions} from "./core.credential";

export class SimpleCredential implements Credential {
    protected readonly credential: Credential;

    constructor(
        options: CoreCredentialOptions,
        storage: KeyStorage,
        protected readonly logger: Logger = console,
    ) {
        this.credential = new CoreCredential(options, storage, this.logger);
    }

    public async remove(): Promise<void> {
        try {
            this.logger.debug('Will remove credential');
            await this.credential.remove();
            this.logger.debug('Done removing credential')
        } catch (error) {
            this.logger.error(error);
            return Promise.reject(error);
        }
    }

    public async authenticate(): Promise<CredentialAssertion> {
        try {
            this.logger.debug('Will authenticate credential');
            const result = await this.credential.authenticate();
            this.logger.debug('Done authenticate credential', result)
            return result;
        } catch (error) {
            this.logger.error(error);
            return Promise.reject(error);
        }
    }

    public async isRegistered(): Promise<boolean> {
        try {
            this.logger.debug('Will check if registered');
            const result = await this.credential.isRegistered();
            this.logger.debug('Done check if registered', result);
            return result;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }

    public async register(options?: RegisterOption): Promise<CredentialRegistration> {
        try {
            this.logger.debug('Will register credential');
            const result = await this.credential.register(options);
            this.logger.debug('Done register credential', result);
            return result;
        } catch (error) {
            this.logger.error(error);
            return Promise.reject(error);
        }
    }
}