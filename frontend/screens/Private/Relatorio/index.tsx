'use client';

import { Container } from '@/components/container';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { useApi } from '@/hooks/use-api';
import { useAuthStore } from '@/store/auth';
import { ClientsAll, Contact } from '@/types/type';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { parsePhoneNumber } from 'react-phone-number-input';

export function RelatorioScreen() {
	const token = useAuthStore((state) => state.token);

	const { data: relatorio, isPending } = useQuery({
		queryKey: ['countdashboard', token],
		queryFn: () => useApi.viewRelatorio(token!),
		enabled: !!token,
		retry: 5,
	});

	return (
		<Container pageTitle="Relatorio">
			{isPending ? (
				<div className="flex w-auto items-center justify-center">
					<Loading />
				</div>
			) : (
				<React.Fragment>
					<div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
						<Card className="@container/card">
							<CardHeader>
								<CardDescription>
									Total de Clientes
								</CardDescription>
								<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
									{isPending ? (
										<Loading />
									) : (
										relatorio.totalClients
									)}
								</CardTitle>
							</CardHeader>
						</Card>
					</div>
					<div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
						{relatorio.data?.map(
							(client: ClientsAll, idx: number) => (
								<Card key={idx}>
									<CardHeader>
										<CardTitle>{client.name}</CardTitle>
									</CardHeader>

									<CardContent>
										<p>E-mail: {client.email}</p>
										<p>
											Telefone:
											{client?.phone
												? parsePhoneNumber(
														`+${client.phone}`,
													)?.formatNational()
												: '-'}
										</p>

										<h4>Contatos</h4>

										{client.contacts.length > 0
											? client.contacts.map(
													(contact: Contact) => (
														<div key={contact.id}>
															- {contact.name}
														</div>
													),
												)
											: '- Sem contatos cadastrados.'}
									</CardContent>
								</Card>
							),
						)}
					</div>
					{/* {relatorio} */}
				</React.Fragment>
			)}
		</Container>
	);
}
