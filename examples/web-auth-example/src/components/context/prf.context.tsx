import { createContext } from 'react';

interface PrfState {
  credentialUserId: string;
  derivedKey?: CryptoKey;
  setCredentialUserIId: (prf: string) => void;
  updateDerivedKey: (derivedKey?: CryptoKey) => void;
}

export const prfContext = createContext<PrfState>({
  credentialUserId: '',
  setCredentialUserIId: () => {},
  updateDerivedKey: () => {},
});
