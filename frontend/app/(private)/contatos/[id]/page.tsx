import { ContactScreen } from '@/screens/Private/Contacts/View';
import { ParamsProps } from '@/types/type';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contato',
};

export default function ContactIdPage({ params }: ParamsProps) {
	const { id } = params;
	return <ContactScreen id={id} />;
}
