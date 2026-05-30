export type Payment = {
	id: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
	contacts: Contact[];
};

export interface Contact {
	id: string;
	clientId: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
}
