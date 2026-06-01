import { NewClientsScreen } from '@/screens/Private/Clients/New';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Novo Cliente',
};

export default function NewClientPage() {
	return <NewClientsScreen />;
}
