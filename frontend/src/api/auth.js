import { api } from '../lib/axios';

export const getUserAddress = async () => {
  const { data } = await api.get('/auth/session');
  return data.address;
};

export const signOut = async () => {
  await api.post('/auth/sign-out');
};

export const getNonce = async () => {
  const { data: nonce } = await api.get('/auth/nonce');

  return nonce;
};

export const verifySignature = async ({ message, signature }) => {
  const { data } = await api.post('/auth/verify', { message, signature });

  return data;
};
