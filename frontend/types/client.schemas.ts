import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const ClientSchema = z.object({
	name: z.string().min(1, 'Informe o nome'),
	email: z.email({ error: 'Informe um e-mail válido' }),
	phone: z
		.string()
		.min(1, 'Informe um telefone')
		.refine((value) => isValidPhoneNumber(value), {
			message: 'Telefone inválido',
		}),
});
