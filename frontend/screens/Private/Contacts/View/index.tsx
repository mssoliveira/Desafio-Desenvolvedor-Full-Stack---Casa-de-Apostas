'use client';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loading } from '@/components/ui/loading';
import { PhoneInput } from '@/components/ui/phone-input';
import { useApi } from '@/hooks/use-api';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function ContactScreen({ id }: { id: string }) {
	const router = useRouter();
	const token = useAuthStore((state) => state.token);

	const {
		data: contact,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ['contact', id],
		queryFn: () => useApi.viewContact(id, token!),
		enabled: !!token && !!id,
		retry: false,
	});

	useEffect(() => {
		if (isError) {
			toast(error.message);
			router.replace('/contatos');
		}
	}, [isError, error]);

	if (isError) {
		return null;
	}

	return (
		<Container pageTitle={`Contato: ${contact?.name}`}>
			{isPending ? (
				<div className="flex w-auto items-center justify-center">
					<Loading />
				</div>
			) : (
				<div className="px-4 lg:px-6 flex gap-4 flex-col">
					<div className="grid grid-cols-1 gap-4">
						<div className="flex flex-col gap-4">
							<Label>Cliente</Label>
							<Input value={contact?.client.name} disabled />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-4">
								<Label>Nome do Contato</Label>
								<Input value={contact?.name} disabled />
							</div>
							<div className="flex flex-col gap-4">
								<Label>Data de registro</Label>
								<Input
									value={format(
										contact?.createdAt,
										'dd/MM/yyyy HH:MM',
										{ locale: ptBR },
									)}
									disabled
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-4">
								<Label>E-mail</Label>
								<Input
									id={contact?.email}
									value={contact?.email}
									disabled
								/>
							</div>
							<div className="flex flex-col gap-4">
								<Label>Telefone</Label>
								<PhoneInput
									international
									smartCaret
									value={'+' + contact?.phone}
									disabled
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</Container>
	);
}
