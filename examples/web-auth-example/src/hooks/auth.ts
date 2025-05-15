import webAuth from '@adorsys-gis/web-auth';
import { LogLevel } from '@adorsys-gis/web-auth-logger';
import type { RegisterOption } from '@adorsys-gis/web-auth-core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCredentialUserID } from './credential-user-id.hooks';
import { encode } from 'base64-arraybuffer';
import { appToast } from './toast';
import { useCallback } from 'react';

const { credential, encryption, storage } = webAuth({
  credentialOptions: {
    rp: {
      id: window.location.hostname,
      name: window.location.hostname,
    },
    creationOptions: {
      authenticatorSelection: {
        residentKey: 'required',
        requireResidentKey: true,
        userVerification: 'required',
      },
    },
  },
  encryptionOptions: {
    tagLength: 128,
  },
  logLevel: LogLevel.debug,
});

const saltKey = 'salt';

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
      appToast('error', { err: err.message });
    },
    onSuccess: async () => {
      const salt = crypto.getRandomValues(new Uint8Array(32)).buffer;
      await storage.save(saltKey, { data: salt });
      await client.invalidateQueries({ queryKey: ['registered'] });
    },
  });
}

export function useDelete() {
  const client = useQueryClient();
  const credential = useCredential();
  const storage = useStorage();
  return useMutation({
    mutationKey: ['remove'],
    mutationFn: () => credential.remove(),
    retry: 0,
    onError: (err: Error) => {
      appToast('error', { err: err.message });
    },
    onSuccess: async () => {
      await storage.remove(saltKey);
      await client.invalidateQueries({ queryKey: ['registered'] });
    },
  });
}

export function useLogout() {
  const { setCredentialUserIId, updateDerivedKey } = useCredentialUserID();
  const logOut = useCallback(() => {
    setCredentialUserIId('');
    updateDerivedKey();
  }, [setCredentialUserIId, updateDerivedKey]);

  return { logOut };
}

export function useAuthentication() {
  const credential = useCredential();
  const encryption = useKeyEncryption();
  const { setCredentialUserIId, updateDerivedKey } = useCredentialUserID();
  const storage = useStorage();
  return useMutation({
    mutationKey: ['authentication'],
    mutationFn: () => credential.authenticate(),
    retry: 0,
    onError: (err: Error) => {
      appToast('error', { err: err.message });
    },
    onSuccess: async ({ userHandle }) => {
      const salt = await storage.get<ArrayBuffer>(saltKey);
      const derivedKey = await encryption.generateKeyFromUserId(userHandle, new Uint8Array(salt.data));
      setCredentialUserIId(encode(userHandle));
      updateDerivedKey(derivedKey.key);
    },
  });
}

export function useGetAuthStatus() {
  return useQuery({
    queryFn: () => credential.isRegistered(),
    queryKey: ['registered'],
  });
}
