'use client';
import { Container } from '@/components/container';
import { DataTable } from '@/components/data-table';
import { useApi } from '@/hooks/use-api';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import { columnsContact } from './columns';

export function AllContactsScreen() {
	const token = useAuthStore((state) => state.token);

	const { data: contacts } = useQuery({
		queryKey: ['contactsAll', token],
		queryFn: () => useApi.findAllContacts(token!),
		enabled: !!token,
		retry: 5,
	});

	return (
		<Container pageTitle="Todos os Contatos">
			<div className="px-4 lg:px-6">
				<DataTable columns={columnsContact} data={contacts ?? []} />
			</div>
		</Container>
	);
}
