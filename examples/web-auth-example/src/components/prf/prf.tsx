import {Key, ThumbsUp} from "react-feather";
import {usePrf} from "../../hooks/prf.hooks.ts";

export function PrfResult() {
    const {prf, derivedKey} = usePrf();
    return (
        <>
            <div className='flex flex-col justify-center gap-4'>
                {prf && (
                    <div className='flex flex-col gap-1'>
                        <h3>PRF Result</h3>
                        <div role='alert' className='alert alert-success' title='Your PRF Token'>
                            <ThumbsUp/>
                            <p className='overflow-hidden truncate w-full'>{prf}</p>
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