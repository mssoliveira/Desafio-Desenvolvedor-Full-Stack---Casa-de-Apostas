import { ContactScreen } from '@/screens/Private/Contacts/View';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contato',
};

export default async function ContactIdPage({ params }) {
	const { id } = await params;
	return <ContactScreen id={id} />;
}
