import { DashboardScreen } from '@/screens/Private/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Todos os clientes',
};

export default function ClientIdPage() {
	return <DashboardScreen />;
}
