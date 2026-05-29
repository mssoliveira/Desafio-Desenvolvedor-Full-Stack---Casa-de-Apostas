import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL não encontrada. Certifique-se de que o arquivo .env existe e contém DATABASE_URL.',
  );
}

const pool: any = new Pool({
  connectionString: process.env.DATABASE_URL || '',
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Criando Usuario Default');

  const userPassword = await bcrypt.hash('#Senha123', 12);
  await prisma.user.upsert({
    where: { email: 'user@user.dev' },
    update: {},
    create: {
      email: 'user@user.dev',
      name: 'Usuário User',
      password: userPassword,
    },
  });

  console.log('Usuario default criado!');
  console.log('Seed completo!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
