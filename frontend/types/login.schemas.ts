import * as z from 'zod';

export const loginSchema = z.object({
	email: z.email({ error: 'Informe um e-mail' }),
	password: z.string().min(1, 'Informe a Senha'),
});
