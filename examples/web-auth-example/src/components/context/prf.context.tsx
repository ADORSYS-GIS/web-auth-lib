import {createContext} from "react";

interface PrfState {
    prf: string;
    derivedKey?: CryptoKey;
    updatePrf: (prf: string) => void;
    updateDerivedKey: (derivedKey?: CryptoKey) => void;
}

export const prfContext = createContext<PrfState>({
    prf: "",
    updatePrf: () => {
    },
    updateDerivedKey: () => {
    },
});

