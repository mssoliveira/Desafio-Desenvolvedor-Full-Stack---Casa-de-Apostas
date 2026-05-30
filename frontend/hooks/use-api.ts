import api from '@/services/api';

export const useApi = {
	findCountDashboard: (token: string) =>
		api.get('v1/dashboard/count', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}),
	findById: (id: string) => api.get(`/users/${id}`),
};
