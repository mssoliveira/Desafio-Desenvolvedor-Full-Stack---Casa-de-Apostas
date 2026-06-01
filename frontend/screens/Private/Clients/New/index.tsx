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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export function NewClientsScreen() {
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

	const createClientMutation = useMutation({
		mutationFn: async (body: any) => {
			return await useApi.createClient(body, token!);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['clientsAll'],
			});
			toast('Novo Cliente inserido com sucesso.');
			router.replace('/clientes');
		},
		onError: (error) => {
			return toast(error.message);
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

			createClientMutation.mutate(body);
		} catch (error) {
			console.log('Log - error:', error);
		} finally {
			setLoading(false);
		}
	};

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
