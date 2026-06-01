import { ApisauceInstance, create } from 'apisauce';
import qs from 'qs';

export interface IFetchInstance {
	del: <T = any>(url: string, headers?: {}) => Promise<T | undefined>;
	get: <T = any>(url: string, headers?: {}) => Promise<T | undefined>;
	post: <T = any>(
		url: string,
		data?: any,
		encode?: boolean,
		headers?: {},
	) => Promise<T | undefined>;
	patch: <T = any>(
		url: string,
		data?: any,
		encode?: boolean,
		headers?: {},
	) => Promise<T | undefined>;
	put: <T = any>(
		url: string,
		data?: any,
		encode?: boolean,
		headers?: {},
	) => Promise<T | undefined>;
	setBaseURL: (newBaseURL: string) => void;
	setHeader: (key: string, value: string) => void;
	deleteHeader: (key: string) => void;
	addResponseTransform: () => void;
	getBaseURL: () => string;
}

function delFactory(request: ApisauceInstance) {
	return async function fn<T = any>(url: string, headers = {}) {
		const response = await request.delete<T>(url, {}, { ...headers });

		if (!response.ok) {
			throw new Error(
				(response.data as any)?.message || 'Erro na requisição',
			);
		}

		return response.data;
	};
}

function getFactory(request: ApisauceInstance) {
	return async function fn<T>(url: string, headers = {}) {
		const response = await request.get<T>(url, {}, { ...headers });
		if (!response.ok) {
			throw new Error(
				(response.data as any)?.message || 'Erro na requisição',
			);
		}

		return response.data;
	};
}

function postFactory(request: ApisauceInstance) {
	return async function fn<T = any>(
		url: string,
		data?: any,
		encode = false,
		headers = {},
	) {
		if (encode) {
			data = qs.stringify(data || {}, { encode: true });
			headers = {
				...headers,
				'content-type': 'application/x-www-form-urlencoded',
			};
		}

		const response = await request.post<T>(url, data || {}, { ...headers });

		if (response && response.status && response.status >= 400) {
			console.error(response);

			throw new Error(
				(response.data as any)?.message || 'Erro na requisição',
			);
		} else if (response && response.data) {
			return response.data;
		}

		return undefined;
	};
}

function patchFactory(request: ApisauceInstance) {
	return async function fn<T = any>(
		url: string,
		data?: any,
		encode = false,
		headers = {},
	) {
		if (encode) {
			data = qs.stringify(data || {}, { encode: true });
			headers = {
				...headers,
				'content-type': 'application/x-www-form-urlencoded',
			};
		}

		const response = await request.patch<T>(url, data || {}, {
			...headers,
		});
		if (!response.ok) {
			throw new Error(
				(response.data as any)?.message || 'Erro na requisição',
			);
		}

		return response.data;
	};
}

function putFactory(request: ApisauceInstance) {
	return async function fn<T = any>(
		url: string,
		data?: any,
		encode = false,
		headers = {},
	) {
		if (encode) {
			data = qs.stringify(data || {}, { encode: true });
			headers = {
				...headers,
				'content-type': 'application/x-www-form-urlencoded',
			};
		}

		headers = {
			...headers,
		};

		const response = await request.put<T>(url, data || {}, { headers });
		if (!response.ok) {
			throw new Error(
				(response.data as any)?.message || 'Erro na requisição',
			);
		}

		return response.data;
	};
}

export function fetchFactory(baseURL: string): IFetchInstance {
	const request = create({
		baseURL,
		headers: { 'content-type': 'application/json' },
		timeout: 100000,
	});

	const api = {
		del: delFactory(request),
		get: getFactory(request),
		post: postFactory(request),
		patch: patchFactory(request),
		put: putFactory(request),
		setBaseURL: (newBaseURL: string) => {
			request.setBaseURL(newBaseURL);
		},
		setHeader: (key: string, value: string) => {
			request.setHeader(key, value);
		},
		deleteHeader: (key: string) => {
			delete request.headers[key];
		},
		addResponseTransform: () => {
			request.addResponseTransform(() => {});
		},
		getBaseURL: () => {
			return request.getBaseURL();
		},
	};

	return api;
}
