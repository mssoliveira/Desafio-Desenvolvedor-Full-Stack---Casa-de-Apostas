import api from '@/services/api';

export const useApi = {
	findCountDashboard: (token: string) =>
		api.get('v1/dashboard/count', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	findAllClients: (token: string) =>
		api.get(`v1/clientes`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
};
