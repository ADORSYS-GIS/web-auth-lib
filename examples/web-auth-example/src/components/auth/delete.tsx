import { Button } from '../button/button';
import { useDelete, useGetAuthStatus } from '../../hooks';
import { useCallback } from 'react';
import { X } from 'react-feather';
import { useCredentialUserID } from '../../hooks';

export function Delete() {
  const { isPending: authPending } = useGetAuthStatus();
  const { setCredentialUserIId, updateDerivedKey } = useCredentialUserID();
  const { mutate, isPending } = useDelete();
  const onClick = useCallback(() => {
    mutate();
    setCredentialUserIId('');
    updateDerivedKey();
  }, [mutate, setCredentialUserIId, updateDerivedKey]);

  return (
    <Button error onClick={onClick} loading={isPending || authPending} soft>
      <span>Delete</span>
      <X />
    </Button>
  );
}
