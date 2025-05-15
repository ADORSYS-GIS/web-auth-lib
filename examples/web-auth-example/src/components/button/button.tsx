import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  onClick: () => void;
  loading: boolean;
  error?: boolean;
  secondary?: boolean;
  primary?: boolean;
  soft?: boolean;
  disabled?: boolean;
}

export function Button({
  primary,
  error,
  secondary,
  loading,
  children,
  onClick,
  soft,
  disabled,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={twMerge([
        'btn btn-block',
        soft && 'btn-soft',
        error && 'btn-error',
        primary && 'btn-primary',
        secondary && 'btn-secondary',
        disabled && 'btn-disabled',
      ])}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) {
          onClick();
        }
      }}
    >
      {loading && <span className="loading loading-lg" />}
      {children}
    </button>
  );
}
