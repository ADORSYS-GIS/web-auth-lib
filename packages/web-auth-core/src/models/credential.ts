import {RegisterOption, CredentialAssertion, CredentialRegistration} from "./key";

export interface Credential {
    register(options?: RegisterOption): Promise<CredentialRegistration>;
    
    remove(): Promise<void>;

    authenticate(): Promise<CredentialAssertion>;

    isRegistered(): Promise<boolean>;
}