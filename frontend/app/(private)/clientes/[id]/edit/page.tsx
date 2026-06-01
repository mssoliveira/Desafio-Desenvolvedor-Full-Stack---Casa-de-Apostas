import { NewEditScreen } from '@/screens/Private/Clients/Edit';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Editar cliente',
};

export default async function ClientEditPage({ params }) {
	const { id } = await params;
	return <NewEditScreen id={id} />;
}
