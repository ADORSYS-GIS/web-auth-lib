import { toast, type TypeOptions } from 'react-toastify';
import { Message } from '../components/toast/message.tsx';

export const appToast = <TData extends { err: string } | { message: string } | undefined>(
  _type: TypeOptions,
  data: TData,
) =>
  toast(Message, {
    autoClose: 5_000,
    customProgressBar: true,
    closeButton: false,
    data,
  });
