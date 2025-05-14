import {Button} from "../button/button";
import {useGetAuthStatus, useLogout} from "../../hooks";
import {LogOut} from "react-feather";

export function Logout() {
    const {isPending: authPending, data} = useGetAuthStatus();
    const {logOut} = useLogout();
    return (
        <Button error onClick={logOut} loading={authPending} soft={data} disabled={!data}>
            <span>Logout</span>
            <LogOut/>
        </Button>
    );
}