import { AllClientsScreen } from '@/screens/Private/Clients/All';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Todos os clientes',
};

export default function ClientsPage() {
	return <AllClientsScreen />;
}
