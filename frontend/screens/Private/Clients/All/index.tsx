'use client';
import { Container } from '@/components/container';
import { DataTable } from '@/components/data-table';
import { useApi } from '@/hooks/use-api';
import { useAuthStore } from '@/store/auth';
import { useQueries } from '@tanstack/react-query';
import { columnsClients } from './columns';

export function AllClientsScreen() {
	const token = useAuthStore((state) => state.token);

	const [allClients] = useQueries({
		queries: [
			{
				queryKey: ['clientsAll', token],
				queryFn: () => useApi.findAllClients(token!),
				enabled: !!token,
				retry: 5,
			},
		],
	});

	return (
		<Container pageTitle="Todos os Clientes">
			<div className="px-4 lg:px-6">
				<DataTable
					columns={columnsClients}
					data={allClients.data ?? []}
				/>
			</div>
		</Container>
	);
}
