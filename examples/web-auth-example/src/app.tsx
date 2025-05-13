import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from "react-toastify";
import {PrfResult} from "./components/prf/prf";
import {Register} from "./components/auth/register";
import {Authenticate} from "./components/auth/authenticate";
import {Logout} from "./components/auth/logout";
import {PrfProvider} from "./components/context/prf.provider";
import {TextField} from "./components/text-field.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <ToastContainer stacked/>
            <QueryClientProvider client={queryClient}>
                <PrfProvider>
                    <div className='container py-4 max-w-md mx-auto flex flex-col gap-4 px-2 sm:px-0'>
                        <h1 className='text-2xl font-extrabold tracking-tight'>WebAuth PRF Example</h1>

                        <div className='flex flex-col justify-center gap-4'>
                            <div className='grid md:grid-cols-2 gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <Register/>
                                    <p>
                                        This will register a new user's credential and save the id of the credential in
                                        the storage, right now localstorage.
                                    </p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <Logout/>
                                    <p>
                                        This will remove the saved credential in storage. This will not remove the
                                        credential from the browser.
                                    </p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Authenticate/>
                                <p>
                                    This will try using the credential previously saved. If no credential, it will not
                                    work.
                                </p>
                            </div>
                            
                            <div className='divider'/>
                            
                            <div className="flex flex-col gap-2">
                                <TextField/>
                            </div>
                            
                            <div className='divider'/>

                            <PrfResult/>
                        </div>
                    </div>
                </PrfProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
