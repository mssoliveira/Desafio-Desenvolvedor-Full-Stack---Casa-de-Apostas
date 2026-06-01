import { NewContactScreen } from '@/screens/Private/Contacts/New';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Todos os clientes',
};

export default function NewContactPage() {
	return <NewContactScreen />;
}
