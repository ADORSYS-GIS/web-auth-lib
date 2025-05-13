import {usePrf} from "../hooks/prf.hooks.ts";
import {useCallback, useEffect, useState} from "react";
import {useKeyEncryption} from "../hooks/auth.ts";
import {decode, encode} from "base64-arraybuffer";

const msgKey = 'tmp-random-text';
const prefixKey = 'encrypted:';

export function TextField() {
    const {derivedKey} = usePrf();
    const encryption = useKeyEncryption();
    const [value, setValue] = useState<string>(() => localStorage.getItem(msgKey) ?? "");

    const decrypt = useCallback(async () => {
        if (!derivedKey) {
            return;
        }

        const split = value.split(prefixKey);
        const suffix = split[1];
        console.log({suffix, value, split});
        const encrpytedBuffer = decode(suffix);
        const decrpyted = await encryption.decryptData(encrpytedBuffer, {key: derivedKey!});
        console.log({decrpyted});
        setValue(decrpyted);
    }, [encryption, derivedKey, value]);

    const encrypt = useCallback(async () => {
        if (!derivedKey) {
            return;
        }

        const encrpyted = await encryption.encryptData(value, {key: derivedKey!});
        localStorage.setItem(msgKey, prefixKey + encode(encrpyted));
    }, [encryption, derivedKey, value]);

    useEffect(() => {
        if (derivedKey && value.startsWith(prefixKey)) {
            decrypt();
        }
    }, [decrypt, derivedKey, value]);

    useEffect(() => {
        if (derivedKey && !value.startsWith(prefixKey)) {
            encrypt();
        }
    }, [encrypt, derivedKey, value]);

    return (
        <div className='flex flex-col gap-2'>
            <h4 className='font-bold tracking-tighter'>A sample message</h4>
            <textarea
                rows={8}
                disabled={!derivedKey}
                className='textarea w-full'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>

    )
}