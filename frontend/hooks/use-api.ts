import api from '@/services/api';

export const useApi = {
	findCountDashboard: (token: string) =>
		api.get('v1/dashboard/count', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	findAllClients: (token: string) =>
		api.get('v1/clientes', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	findClients: (token: string) =>
		api.get('v1/clientes/list', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	viewClient: (id: string, token: string) =>
		api.get('v1/clientes/' + id, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	createClient: (data: any, token: string) =>
		api.post('v1/clientes', data, false, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	editClient: (id: string, data: any, token: string) =>
		api.put('v1/clientes/' + id, data, false, {
			Authorization: `Bearer ${token}`,
		}),
	deleteClient: (id: string, token: string) =>
		api.del('v1/clientes/' + id, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	findAllContacts: (token: string) =>
		api.get('v1/contatos', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	viewContact: (id: string, token: string) =>
		api.get('v1/contatos/' + id, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	createContact: (data: any, token: string) =>
		api.post('v1/contatos', data, false, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	editContact: (id: string, data: any, token: string) =>
		api.put('v1/contatos/' + id, data, false, {
			Authorization: `Bearer ${token}`,
		}),
	deleteContact: (id: string, token: string) =>
		api.del('v1/contatos/' + id, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	viewRelatorio: (token: string) =>
		api.get('v1/clientes/relatorio', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
