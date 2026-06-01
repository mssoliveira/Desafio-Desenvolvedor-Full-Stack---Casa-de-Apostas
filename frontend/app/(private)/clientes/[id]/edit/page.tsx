import { EditClientScreen } from '@/screens/Private/Clients/Edit';
import { ParamsProps } from '@/types/type';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Editar cliente',
};

export default function ClientEditPage({ params }: ParamsProps) {
	const { id } = params;
	return <EditClientScreen id={id} />;
}
