import {
    Credential,
    CredentialAssertion,
    CredentialRegistration,
    KeyStorage,
    Logger,
    RegisterOption,
} from "@adorsys-gis/web-auth-core";

export interface CoreCredentialOptions {
    rp: PublicKeyCredentialRpEntity;
    challengeSize?: number;
    creationOptions?: Omit<PublicKeyCredentialCreationOptions, 'user' | 'challenge' | 'pubKeyCredParams' | 'rp'>;
    authenticationOptions?: Omit<PublicKeyCredentialRequestOptions, 'challenge' | 'rpId' | 'allowCredentials'> & {};
}

export class CoreCredential implements Credential {
    constructor(
        protected readonly options: CoreCredentialOptions,
        protected readonly storage: KeyStorage,
        protected readonly logger: Logger,
    ) {
    }

    protected get credentialIdKey() {
        return "credential_id"
    }

    protected get challengeSize() {
        return this.options.challengeSize ?? 12;
    }

    public async remove(): Promise<void> {
        await this.storage.remove(this.credentialIdKey);
    }

    public async register(options?: RegisterOption): Promise<CredentialRegistration> {
        const regOptions = await this.getRegOptions(options);
        const cred = await this.createCredential(regOptions);
        const credentialId = cred.rawId;
        await this.storage.save<ArrayBuffer>(this.credentialIdKey, {data: credentialId});
        return {credentialId, rawCredential: cred};
    }

    public async authenticate(): Promise<CredentialAssertion> {
        const authOptions = await this.getAuthOptions();
        const rawCredential = await this.getCredential(authOptions);
        const userHandle = (rawCredential.response as AuthenticatorAssertionResponse).userHandle;
        return {rawCredential, userHandle};
    }

    public async isRegistered(): Promise<boolean> {
        const storedCredentialId = await this.storage.get<ArrayBuffer>(this.credentialIdKey);
        return !!storedCredentialId?.data;
    }

    protected async getCredential(authOptions: PublicKeyCredentialRequestOptions): Promise<PublicKeyCredential> {
        const cred = await navigator.credentials.get({
            publicKey: authOptions,
        });

        if (!cred) {
            throw new Error("Authentication failed: No assertion returned.");
        }

        return cred as PublicKeyCredential;
    }

    protected async createCredential(options: PublicKeyCredentialCreationOptions): Promise<PublicKeyCredential> {
        const rawCredential = await navigator.credentials.create({
            publicKey: options,
        });

        if (rawCredential.type !== 'public-key') {
            throw new Error("Credential type not implemented.");
        }
        const publicCredential = rawCredential as PublicKeyCredential;

        if (!publicCredential.rawId) {
            throw new Error("Registration failed: Wrong credential returned.");
        }

        return publicCredential;
    }

    protected async getRegOptions(options: RegisterOption = {}): Promise<PublicKeyCredentialCreationOptions> {
        const [challenge, userId, pubKeyCredParams] = await Promise.all([
            this.generateSalt(this.challengeSize),
            this.generateSalt(32),
            this.getPubKeyCred(),
        ]);

        return {
            ...(this.options.creationOptions ?? {}),
            rp: this.options.rp,
            challenge: challenge.buffer,
            user: {
                id: userId,
                name: options.user?.name ?? '',
                displayName: options.user?.displayName ?? '',
            },
            pubKeyCredParams: pubKeyCredParams,
        };
    }

    protected async getPubKeyCred(): Promise<PublicKeyCredentialParameters[]> {
        return [
            {type: "public-key", alg: -7},   // ES256 (ECDSA P-256)
            {type: "public-key", alg: -257}, // RS256 (RSA)
            {type: "public-key", alg: -8},   // EdDSA
            {type: "public-key", alg: -35},  // ES384
            {type: "public-key", alg: -36}   // ES512
        ];
    }
    
    protected async getAllowCredentials(): Promise<PublicKeyCredentialDescriptor[]> {
        const storedCredentialId = await this.storage.get<ArrayBuffer>(this.credentialIdKey);
        return [
            {
                type: "public-key",
                id: storedCredentialId.data,
            },
        ];
    }

    protected async generateSalt(size: number) {
        return crypto.getRandomValues(new Uint8Array(size));
    }

    protected async getAuthOptions(): Promise<PublicKeyCredentialRequestOptions> {
        const [challenge, allowCredentials] = await Promise.all([
            this.generateSalt(this.challengeSize),
            this.getAllowCredentials()
        ]);

        return {
            ...(this.options.authenticationOptions ?? {}),
            challenge: challenge.buffer,
            allowCredentials: allowCredentials,
            rpId: this.options.rp.id,
        };
    }

}