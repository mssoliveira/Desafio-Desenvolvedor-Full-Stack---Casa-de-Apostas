'use client';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { useApi } from '@/hooks/use-api';
import { useAuthStore } from '@/store/auth';
import { CreateClientSchema } from '@/types/create-client.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export function NewEditScreen({ id }: { id: string }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const token = useAuthStore((state) => state.token);

	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof CreateClientSchema>>({
		resolver: zodResolver(CreateClientSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
		},
	});

	const { data: client } = useQuery({
		queryKey: ['client', id],
		queryFn: () => useApi.viewClient(id, token!),
		enabled: !!token,
		retry: 5,
	});

	const updateClientMutation = useMutation({
		mutationFn: async (body: any) => {
			return await useApi.editClient(id, body, token!);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['clientsAll'],
			});
			queryClient.invalidateQueries({
				queryKey: ['client', id],
			});

			toast('Cliente atualizado com sucesso.');
			router.replace('/clientes');
		},
		onError: (error) => {
			toast(error.message);
		},
	});

	const onSubmit = async (data: z.infer<typeof CreateClientSchema>) => {
		try {
			setLoading(true);
			const body = {
				name: data.name,
				email: data.email,
				phone: data.phone.replace(/\D/g, ''),
			};

			updateClientMutation.mutate(body);
		} catch (error) {
			console.log('Log - error:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (client) {
			form.reset({
				name: client.name,
				email: client.email,
				phone: '+' + client.phone,
			});
		}
	}, [client, form]);

	return (
		<Container pageTitle="Criar Cliente">
			<div className="px-4 lg:px-6">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										Nome Completo
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
						<div className="flex gap-4">
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>
											E-mail
										</FieldLabel>
										<Input
											{...field}
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="user@user.dev"
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
							<Controller
								name="phone"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>
											Telefone
										</FieldLabel>
										<PhoneInput
											international
											smartCaret
											defaultCountry="BR"
											{...field}
											id={field.name}
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
						</div>

						<Field>
							<Button disabled={loading} type="submit">
								Criar novo cliente
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</div>
		</Container>
	);
}
