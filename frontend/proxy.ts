import {
	NextAuthMiddlewareOptions,
	NextRequestWithAuth,
	withAuth,
} from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const publicRoutes = ['/auth/login'];

const proxy = (request: NextRequestWithAuth) => {
	const isPublicRoute = publicRoutes.some((path) =>
		request.nextUrl.pathname.startsWith(path),
	);

	if (!isPublicRoute && !request.nextauth.token) {
		const url = request.nextUrl.clone();
		url.pathname = '/auth/login';
		return NextResponse.redirect(url);
	}
};

const callbackOptions: NextAuthMiddlewareOptions = {
	callbacks: {
		authorized: ({ token }) => !!token,
	},
};

export default withAuth(proxy, callbackOptions);

export const config = {
	matcher: ['/((?!auth/login).*)'],
};
