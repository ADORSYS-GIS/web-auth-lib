import { X } from 'react-feather';
import { type ToastContentProps, type TypeOptions } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';

const textType: Record<TypeOptions, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  default: 'text-dash',
};

export function Message({ closeToast, data, toastProps }: ToastContentProps<{ err: string } | { message: string }>) {
  if (!data) return null;

  const message = 'err' in data ? data.err : data.message;
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const autoCloseDuration = Number(toastProps.autoClose);
    const startTime = Date.now();

    const animationFrame = requestAnimationFrame(function updateProgress() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      // Calculate progress percentage
      const newProgress = Math.min((elapsedTime / autoCloseDuration) * 100, 100);

      setProgress(newProgress);

      // Continue animation until 100%
      if (elapsedTime < autoCloseDuration) {
        requestAnimationFrame(updateProgress);
      } else {
        closeToast();
      }
    });

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [closeToast, toastProps.autoClose]);

  return (
    <div className="flex gap-4 items-center justify-center">
      <span>{message}</span>

      <div className="flex gap-2">
        <div
          className={twMerge('radial-progress', [textType[toastProps.type]])}
          style={
            {
              '--thickness': '4px',
              '--value': progress,
              '--size': '2rem',
            } as React.CSSProperties
          }
          aria-valuenow={progress}
          role="progressbar"
        ></div>

        <button onClick={closeToast} type="button" className="btn btn-sm btn-circle" aria-label="Close toast">
          <X className="h-6 w-6 shrink-0 stroke-current" />
        </button>
      </div>
    </div>
  );
}
