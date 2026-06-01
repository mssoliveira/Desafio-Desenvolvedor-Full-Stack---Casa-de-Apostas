import { AllContactsScreen } from '@/screens/Private/Contacts/All';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Todos os contatos',
};

export default function ContactsPage() {
	return <AllContactsScreen />;
}
