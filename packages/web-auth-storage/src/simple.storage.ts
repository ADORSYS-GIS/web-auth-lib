import {AbstractKeyStorage} from "./storages/simple-abstract.storage";
import {KeyStorage, Logger} from "@adorsys-gis/web-auth-core";
import {LocalStorage} from "./storages/local.storage";

export class SimpleStorage extends AbstractKeyStorage {
    constructor(
        prefix: string = 'web-auth::',
        logger?: Logger,
        delegate?: KeyStorage
    ) {
        super(prefix, logger ?? console, delegate ?? new LocalStorage());
    }
}