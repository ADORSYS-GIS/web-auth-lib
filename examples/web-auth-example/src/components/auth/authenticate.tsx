import {Button} from "../button/button";
import {useAuthentication, useCredentialUserID, useGetAuthStatus} from "../../hooks";
import {useCallback} from "react";
import {Link} from "react-feather";

export function Authenticate() {
    const {derivedKey} = useCredentialUserID();
    const {isPending: authPending, data: isRegistered} = useGetAuthStatus();
    const {mutate, isPending} = useAuthentication();
    const onClick = useCallback(() => {
        if (isRegistered) {
            mutate()
        }
    }, [mutate, isRegistered]);
    return (
        <Button
            primary
            onClick={onClick}
            loading={isPending || authPending}
            soft={!isRegistered}
            disabled={!isRegistered || !!derivedKey}
        >
            <span>Authenticate</span>
            <Link/>
        </Button>
    )
}