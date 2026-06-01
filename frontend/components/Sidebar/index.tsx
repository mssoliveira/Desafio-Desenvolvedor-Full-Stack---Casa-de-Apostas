'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/store/auth';
import {
	IconFile,
	IconHome,
	IconPhoneCall,
	IconUserCheck,
} from '@tabler/icons-react';
import * as React from 'react';
import { NavMain } from '../nav-main';
import { NavUser } from '../nav-user';

const data = [
	{
		title: 'Dashboard',
		url: '/',
		icon: IconHome,
		isActive: true,
		items: [
			{
				title: 'Inicio',
				url: '/',
			},
		],
	},
	{
		title: 'Clientes',
		url: '#',
		icon: IconUserCheck,
		items: [
			{
				title: 'Todos',
				url: '/clientes',
			},
			{
				title: 'Novo',
				url: '/clientes/novo',
			},
		],
	},
	{
		title: 'Contatos',
		url: '#',
		icon: IconPhoneCall,
		items: [
			{
				title: 'Todos',
				url: '/contatos',
			},
			{
				title: 'Novo',
				url: '/contatos/novo',
			},
		],
	},
	{
		title: 'Relatório',
		url: '#',
		icon: IconFile,
		items: [
			{
				title: 'Novo',
				url: '/relatorio',
			},
		],
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = useAuthStore((state) => state.user);

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
							<a href="#">
								<span className="text-base font-semibold">
									Dashboard
								</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
}
