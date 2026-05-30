'use client';
import React from 'react';
import { SiteHeader } from './site-header';

interface iProps {
	pageTitle: string;
	children: React.ReactNode;
}

export const Container = ({ pageTitle, children }: iProps) => {
	return (
		<React.Fragment>
			<SiteHeader pageTitle={pageTitle} />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						{children}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
