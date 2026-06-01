'use client';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApi } from '@/hooks/use-api';
import { useAuthStore } from '@/store/auth';
import { ContactAll } from '@/types/type';
import { IconDotsVertical } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

const HandleActions = ({ idAction }: { idAction: string }) => {
	const router = useRouter();
	const token = useAuthStore((state) => state.token);

	const handleView = async () => {
		return router.push('/contatos/' + idAction);
	};

	const handleEdit = async () => {
		return router.push('/contatos/' + idAction + '/edit');
	};

	const queryClient = useQueryClient();

	const deleteClientMutation = useMutation({
		mutationFn: async (id: string) => {
			return await useApi.deleteClient(idAction, token!);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['contactsAll'],
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleDelete = () => {
		deleteClientMutation.mutate(idAction);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button
					variant="ghost"
					size="icon"
					className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
				>
					<IconDotsVertical />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-32">
				<DropdownMenuItem onClick={handleView}>Ver</DropdownMenuItem>
				<DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleDelete} variant="destructive">
					Excluir
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const columnsContact: ColumnDef<ContactAll>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nome do Contato" />
		),
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
	},
	{
		accessorKey: 'phone',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Telefone" />
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => <HandleActions idAction={row.original.id} />,
	},
];
