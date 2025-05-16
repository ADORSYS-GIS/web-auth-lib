import { useCredentialUserID, useKeyEncryption } from '../hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { decode, encode } from 'base64-arraybuffer';

const msgKey = 'tmp-random-text';
const prefixKey = 'encrypted:';

export function TextField() {
  const { derivedKey } = useCredentialUserID();
  const encryption = useKeyEncryption();
  const [value, setValue] = useState<string>(() => localStorage.getItem(msgKey) ?? '');
  const disabled = useMemo<boolean>(() => !derivedKey || value?.startsWith(prefixKey), [derivedKey, value]);

  const decrypt = useCallback(async () => {
    if (!derivedKey) {
      return;
    }

    const encryptedStr = value.split(prefixKey).filter(Boolean)[0];
    const encryptedBuffer = decode(encryptedStr);
    const decrypted = await encryption.decryptData(encryptedBuffer, { key: derivedKey! });
    setValue(decrypted);
  }, [encryption, derivedKey, value]);

  const encrypt = useCallback(async () => {
    if (!derivedKey) {
      return;
    }

    const encrypted = await encryption.encryptData(value, { key: derivedKey! });
    localStorage.setItem(msgKey, prefixKey + encode(encrypted));
  }, [encryption, derivedKey, value]);

  useEffect(() => {
    if (!derivedKey) {
      setValue(localStorage.getItem(msgKey) ?? '');
      return;
    }

    if (value.startsWith(prefixKey)) {
      decrypt().catch(console.error);
      return;
    }

    encrypt().catch(console.error);
  }, [encrypt, derivedKey, value, decrypt]);

  return (
    <textarea
      rows={8}
      disabled={disabled}
      className="tracking-tighter textarea w-full"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
