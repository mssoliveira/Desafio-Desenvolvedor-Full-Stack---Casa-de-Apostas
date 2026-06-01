import { EditContactScreen } from '@/screens/Private/Contacts/Edit';
import { ParamsProps } from '@/types/type';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Editar contato',
};

export default function ContactEditPage({ params }: ParamsProps) {
	const { id } = params;
	return <EditContactScreen id={id} />;
}
