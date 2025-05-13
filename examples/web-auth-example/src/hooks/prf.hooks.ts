import {useContext} from "react";
import {prfContext} from "../components/context/prf.context.tsx";

export function usePrf() {
    return useContext(prfContext);
}