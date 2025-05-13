import {Button} from "../button/button";
import {useGetAuthStatus, useLogout} from "../../hooks/hooks.ts";
import {useCallback} from "react";
import {X} from "react-feather";
import {usePrf} from "../../hooks/prf.hooks.ts";

export function Logout() {
    const {isPending: authPending, data} = useGetAuthStatus();
    const {updatePrf, updateDerivedKey} = usePrf();
    const {mutate, isPending} = useLogout();
    const onClick = useCallback(() => {
        mutate();
        updatePrf("");
        updateDerivedKey();
    }, [mutate, updatePrf, updateDerivedKey]);
    
    return (
        <Button error onClick={onClick} loading={isPending || authPending} soft={data} disabled={!data}>
            <span>Delete</span>
            <X/>
        </Button>
    )
}