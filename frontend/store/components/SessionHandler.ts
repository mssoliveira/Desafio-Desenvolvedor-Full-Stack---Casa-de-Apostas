'use client';
import { useAuthStore } from '@/store/auth';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

function SessionHandler() {
	const { data: session } = useSession();
	const { saveUser, clearUser, saveToken, clearToken } = useAuthStore();

	useEffect(() => {
		if (session?.user) {
			saveToken(session?.user.token);
			saveUser(session?.user);
		} else {
			clearUser();
			clearToken();
		}
	}, [session, saveUser, clearUser, saveToken, clearToken]);

	return null;
}

export default SessionHandler;
