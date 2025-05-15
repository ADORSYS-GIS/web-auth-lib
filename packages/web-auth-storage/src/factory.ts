import { KeyStorage, Logger } from '@adorsys-gis/web-auth-core';
import { LocalStorage } from './storages/local.storage';
import { MemoryStorage } from './storages/memory.storage';
import { SimpleStorage } from './storages/simple.storage';
import { IdxDbStorage } from './storages/idx-db.storage';

export type KeyStorageFactoryOptions =
  | {
      type: 'simple';
      prefix?: string;
      logger?: Logger;
      delegate?: KeyStorage;
    }
  | {
      type: 'local_storage';
    }
  | {
      type: 'in_memory';
    }
  | {
      type: 'idx_db';
    };

export function keyStorageFactory(options: KeyStorageFactoryOptions): KeyStorage {
  const type = options.type;
  switch (type) {
    case 'local_storage':
      return new LocalStorage();
    case 'in_memory':
      return new MemoryStorage();
    case 'idx_db':
      return new IdxDbStorage();
    case 'simple':
      return new SimpleStorage(options);
    default:
      throw new Error('Unknown type "' + type + '"');
  }
}
