import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { PrfResult } from './components/prf/prf';
import { Register } from './components/auth/register';
import { Authenticate } from './components/auth/authenticate';
import { Logout } from './components/auth/logout';
import { PrfProvider } from './components/context/prf.provider';
import { TextField } from './components/text-field.tsx';
import { Delete } from './components/auth/delete.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastContainer stacked />
      <QueryClientProvider client={queryClient}>
        <PrfProvider>
          <div className="container py-4 max-w-md mx-auto flex flex-col gap-4 px-4 sm:px-0">
            <h1 className="text-2xl font-extrabold tracking-tight">WebAuth PRF Example</h1>

            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-2">
                <Delete />
                <p className="opacity-75">
                  This will remove the saved credential in storage. This will not remove the credential from the
                  browser. The user cannot login easily
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Register />
                <p className="opacity-75">
                  This will register a new user's credential and save the id of the credential in the storage, right now
                  localstorage.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Authenticate />
                  <p className="opacity-75">
                    This will try using the credential previously saved. If no credential, it will not work.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Logout />
                  <p className="opacity-75">
                    This will remove the userID from the memory. This will not remove the credential from the browser.
                    The user can still login easily
                  </p>
                </div>
              </div>

              <div className="divider" />

              <div className="flex flex-col gap-2">
                <h4 className="opacity-75">A sample message</h4>
                <TextField />
              </div>

              <div className="divider" />

              <PrfResult />
            </div>
          </div>
        </PrfProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
