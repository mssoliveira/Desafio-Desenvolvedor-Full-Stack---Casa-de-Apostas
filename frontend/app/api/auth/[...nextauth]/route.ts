import api from '@/services/api';
import * as JWT from 'jsonwebtoken';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'text' },
			},
			async authorize(credentials) {
				const body = {
					email: credentials?.email,
					password: credentials?.password,
				};

				try {
					const response = await api.post('v1/auth/login', body);
					if (!response) {
						throw new Error('No response from server');
					}
					if (response.status >= 400) {
						throw new Error('Invalid credentials');
					}

					if (response.access_token) {
						const verifyToken = JWT.verify(
							response.access_token,
							process.env.NEXTAUTH_SECRET!,
						) as any;

						if (verifyToken) {
							return {
								...verifyToken,
								token: response.access_token,
							};
						}
					}
				} catch (err) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			return { ...token, ...user };
		},
		session: async ({ session, token }) => {
			session.user = token;
			return session;
		},
	},
	pages: {
		signIn: '/auth/login',
	},
	debug: true,
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
