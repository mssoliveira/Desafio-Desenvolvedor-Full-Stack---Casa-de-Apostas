import { EditContactScreen } from '@/screens/Private/Contacts/Edit';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Editar contato',
};

export default async function ContactEditPage({ params }) {
	const { id } = await params;
	return <EditContactScreen id={id} />;
}
