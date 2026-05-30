import { DashboardScreen } from '@/screens/Private/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return <DashboardScreen />;
}
