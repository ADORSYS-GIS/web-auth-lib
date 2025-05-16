import { type PropsWithChildren, useState } from 'react';
import { prfContext } from './prf.context.tsx';

export function PrfProvider({ children }: PropsWithChildren) {
  const [prf, updatePrf] = useState('');
  const [derivedKey, updateDerivedKey] = useState<CryptoKey | undefined>();

  return (
    <prfContext.Provider
      value={{ credentialUserId: prf, setCredentialUserIId: updatePrf, derivedKey, updateDerivedKey }}
    >
      {children}
    </prfContext.Provider>
  );
}
