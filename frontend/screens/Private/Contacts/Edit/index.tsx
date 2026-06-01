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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useApi } from '@/hooks/use-api';
import { useAuthStore } from '@/store/auth';
import { ContactSchema } from '@/types/contact.schemas';
import { clientSelect } from '@/types/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export function EditContactScreen({ id }: { id: string }) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const token = useAuthStore((state) => state.token);

	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof ContactSchema>>({
		resolver: zodResolver(ContactSchema),
		defaultValues: {
			clientId: '',
			name: '',
			email: '',
			phone: '',
		},
	});

	const { data: clients } = useQuery({
		queryKey: ['clientsList', token],
		queryFn: () => useApi.findClients(token!),
		enabled: !!token,
		retry: 2,
	});

	const { data: contact } = useQuery({
		queryKey: ['contact', id],
		queryFn: () => useApi.viewContact(id, token!),
		enabled: !!token,
		retry: 5,
	});

	const updateMutation = useMutation({
		mutationFn: async (body: any) => {
			return await useApi.editContact(id, body, token!);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['contactsAll'],
			});
			queryClient.invalidateQueries({
				queryKey: ['contact', id],
			});

			toast('Contato atualizado com sucesso.');
			router.replace('/contatos');
		},
		onError: (error) => {
			toast(error.message);
		},
	});

	const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
		try {
			setLoading(true);
			const body = {
				clientId: data.clientId,
				name: data.name,
				email: data.email,
				phone: data.phone.replace(/\D/g, ''),
			};

			updateMutation.mutate(body);
		} catch (error) {
			console.log('Log - error:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (contact) {
			form.reset({
				clientId: contact.clientId,
				name: contact.name,
				email: contact.email,
				phone: '+' + contact.phone,
			});
		}
	}, [contact, form]);

	return (
		<Container pageTitle="Editar contato">
			<div className="px-4 lg:px-6">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="clientId"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										Cliente
									</FieldLabel>

									<Select
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger>
											<SelectValue placeholder="Selecione um cliente">
												{
													clients?.find(
														(
															client: clientSelect,
														) =>
															client.id ===
															field.value,
													)?.name
												}
											</SelectValue>
										</SelectTrigger>

										<SelectContent>
											{clients?.map(
												(client: clientSelect) => (
													<SelectItem
														key={client.id}
														value={client.id}
													>
														{client.name}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>

									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										Nome
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
								Salvar alterações
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</div>
		</Container>
	);
}
