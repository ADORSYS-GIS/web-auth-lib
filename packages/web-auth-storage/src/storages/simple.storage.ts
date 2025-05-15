import { AbstractKeyStorage } from './simple-abstract.storage';
import { KeyStorage, Logger } from '@adorsys-gis/web-auth-core';
import { LocalStorage } from './local.storage';

export interface SimpleStorageOptions {
  prefix?: string;
  logger?: Logger;
  delegate?: KeyStorage;
}

export class SimpleStorage extends AbstractKeyStorage {
  constructor({ prefix: prefix = 'web-auth::', logger, delegate }: SimpleStorageOptions) {
    super(prefix, logger ?? console, delegate ?? new LocalStorage());
  }
}
