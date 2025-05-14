import {Key, ThumbsUp} from "react-feather";
import {useCredentialUserID} from "../../hooks";

export function PrfResult() {
    const {credentialUserId, derivedKey} = useCredentialUserID();
    return (
        <>
            <div className='flex flex-col justify-center gap-4'>
                {credentialUserId && (
                    <div className='flex flex-col gap-1'>
                        <h3>Credential UserId Result</h3>
                        <div role='alert' className='alert alert-success' title='Your Credential UserId Token'>
                            <ThumbsUp/>
                            <p className='overflow-hidden truncate w-full'>{credentialUserId}</p>
                        </div>
                    </div>
                )}

                {derivedKey && (
                    <div className='flex flex-col gap-1'>
                        <h3>Derived Key</h3>
                        <div role='alert' className='alert alert-info' title='Your Derived Key'>
                            <Key/>
                            <p className='overflow-hidden truncate w-full'>
                                {derivedKey.type}::{derivedKey.algorithm?.name}::{JSON.stringify(derivedKey.usages)}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}