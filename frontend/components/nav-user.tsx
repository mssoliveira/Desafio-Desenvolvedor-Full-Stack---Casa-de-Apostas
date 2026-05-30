'use client';

import { IconLogout } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getNameInitials } from '@/lib/helpers';
import { useAuthStore } from '@/store/auth';
import { signOut } from 'next-auth/react';

export function NavUser({ user }: any) {
	const clearUser = useAuthStore((state) => state.clearUser);
	const clearToken = useAuthStore((state) => state.clearToken);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar className="h-8 w-8 rounded-lg grayscale">
						<AvatarImage
							src={user?.image || ''}
							alt={user?.name || ''}
						/>
						<AvatarFallback className="rounded-lg">
							{getNameInitials(user?.name || '')}
						</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">
							{user?.name || ''}
						</span>
						<span className="truncate text-xs text-muted-foreground">
							{user?.email || ''}
						</span>
					</div>
					<a
						onClick={() => {
							clearUser();
							clearToken();
							signOut({ callbackUrl: '/auth/login' });
						}}
						className="cursor-pointer"
					>
						<IconLogout className="ml-auto size-4" />
					</a>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
