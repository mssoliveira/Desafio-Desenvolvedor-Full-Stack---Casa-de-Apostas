import { ClientScreen } from '@/screens/Private/Clients/View';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cliente',
};

export default async function ClientIdPage({ params }) {
	const { id } = await params;
	return <ClientScreen id={id} />;
}
