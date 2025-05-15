import { Button } from '../button/button';
import { useGetAuthStatus, useRegister } from '../../hooks';
import { useCallback } from 'react';
import { LogIn } from 'react-feather';

export function Register() {
  const { isPending: authPending, data: isRegistered } = useGetAuthStatus();
  const { mutate, isPending } = useRegister();
  const onClick = useCallback(() => {
    if (isRegistered) {
      return;
    }

    mutate({
      user: {
        name: 'John',
        displayName: 'John',
      },
    });
  }, [mutate, isRegistered]);
  return (
    <Button secondary onClick={onClick} loading={isPending || authPending} soft={isRegistered}>
      <span>Register</span>
      <LogIn />
    </Button>
  );
}
