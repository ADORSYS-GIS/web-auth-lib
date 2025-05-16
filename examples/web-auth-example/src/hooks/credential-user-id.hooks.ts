import { useContext } from 'react';
import { prfContext, type PrfState } from '../components/context/prf.context.tsx';

export function useCredentialUserID(): PrfState {
  return useContext(prfContext);
}
