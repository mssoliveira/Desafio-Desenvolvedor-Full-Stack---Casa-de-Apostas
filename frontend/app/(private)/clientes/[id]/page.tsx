import { ClientScreen } from '@/screens/Private/Clients/View';
import { ParamsProps } from '@/types/type';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cliente',
};

export default function ClientIdPage({ params }: ParamsProps) {
	const { id } = params;
	return <ClientScreen id={id} />;
}
