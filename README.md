# WebAuthn Authentication Library

This project provides a WebAuthn authentication library with a single main function: `webAuth`.

## Installation

To install the library, run:
```bash
yarn add @adorsys-gis/web-auth
```

## Usage

The library exports a single function: `webAuth`.

### webAuth
```typescript
import webAuth from '@adorsys-gis/web-auth';

const { credential, encryption, storage, logger } = webAuth({
  credentialOptions: {
    // credential options
  },
  encryptionOptions: {
    // encryption options
  },
  // other options
});
```

## Configuration

The `webAuth` function takes an options object with the following properties:
- `credentialOptions`: Required. Options for credential creation.
- `encryptionOptions`: Optional. Options for encryption.
- `storageOptionType`: Optional. Type of storage to use (default: 'simple').
- `loggerType`: Optional. Type of logger to use (default: 'level').
- `logLevel`: Optional. Log level (default: LogLevel.log).

## Returned Object

The `webAuth` function returns an object with four properties:
- `credential`: An instance of `Credential` for WebAuthn operations.
- `encryption`: An instance of `KeyEncryption` for key management.
- `storage`: An instance of `KeyStorage` for storing keys.
- `logger`: An instance of `Logger` for logging.

## Links

- [Bitwarden Community Discussion](https://community.bitwarden.com/t/support-for-storing-prf-capable-passkeys-in-bitwarden-vault/82239/10)
