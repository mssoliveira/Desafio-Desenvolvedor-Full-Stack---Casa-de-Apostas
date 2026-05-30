'use client';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Payment } from '@/types/type';
import { ColumnDef } from '@tanstack/react-table';

export const columnsClients: ColumnDef<Payment>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nome" />
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
];
