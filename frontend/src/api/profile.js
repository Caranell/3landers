import { api } from '../lib/axios.js';

export const updateTwitterHandle = async ({ twitterHandle }) => api.post('/profile/twitterHandle', { twitterHandle });

export const updateUsername = async ({ username }) => api.post('/profile/username', { username });

export const getUserData = async () => api.get('/profile');
