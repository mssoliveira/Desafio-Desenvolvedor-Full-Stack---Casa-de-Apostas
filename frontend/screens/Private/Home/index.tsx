'use client';

import { Container } from '@/components/container';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export function DashboardScreen() {
	return (
		<Container pageTitle="Dashboard">
			<div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
				<Card className="@container/card">
					<CardHeader>
						<CardDescription>Total de Clientes</CardDescription>
						<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
							$1,250.00
						</CardTitle>
					</CardHeader>
				</Card>
			</div>
		</Container>
	);
}
