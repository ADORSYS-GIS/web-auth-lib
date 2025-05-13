import webAuth from "@adorsys-gis/web-auth-prf";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {RegisterOption} from "@adorsys-gis/web-auth-core";
import {encode} from "base64-arraybuffer";
import {usePrf} from "./prf.hooks.ts";
import {appToast} from "./toast.ts";

const {credential, encryption, storage} = webAuth({
    rp: {
        id: window.location.hostname,
        name: window.location.hostname,
    },
    creationOptions: {
        authenticatorSelection: {
            authenticatorAttachment: "platform",
            residentKey: "required",
            requireResidentKey: true,
        },
    }
});

const saltKey = "salt";

export function useStorage() {
    return storage;
}

export function useCredential() {
    return credential;
}

export function useKeyEncryption() {
    return encryption;
}

export function useRegister() {
    const client = useQueryClient();
    const credential = useCredential();
    const storage = useStorage();
    return useMutation({
        mutationKey: ['register'],
        mutationFn: (params: RegisterOption) => credential.register(params),
        retry: 0,
        onError: (err: Error) => {
            appToast('error', {err});
        },
        onSuccess: async () => {
            const salt = crypto.getRandomValues(new Uint8Array(32)).buffer;
            await storage.save(saltKey, {data: salt});
            await client.invalidateQueries({queryKey: ['registered']})
        }
    })
}

export function useLogout() {
    const client = useQueryClient();
    const credential = useCredential();
    const storage = useStorage();
    return useMutation({
        mutationKey: ['remove'],
        mutationFn: () => credential.remove(),
        retry: 0,
        onError: (err: Error) => {
            appToast('error', {err});
        },
        onSuccess: async () => {
            await storage.remove(saltKey);
            await client.invalidateQueries({queryKey: ['registered']})
        }
    })
}

export function useAuthentication() {
    const credential = useCredential();
    const encryption = useKeyEncryption();
    const {updatePrf, updateDerivedKey} = usePrf();
    const storage = useStorage();
    return useMutation({
        mutationKey: ['authentication'],
        mutationFn: () => credential.authenticate(),
        retry: 0,
        onError: (err: Error) => {
            appToast('error', {err});
        },
        onSuccess: async ({prfResult}) => {
            const salt = await storage.get<ArrayBuffer>(saltKey);
            const derivedKey = await encryption.deriveKey(prfResult, new Uint8Array(salt.data));
            updatePrf(encode(prfResult));
            updateDerivedKey(derivedKey.key);
        }
    })
}

export function useGetAuthStatus() {
    return useQuery({
        queryFn: () => credential.isRegistered(),
        queryKey: ['registered'],
    })
}