export type ClientsAll = {
	id: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
	contacts: Contact[];
};

export interface ContactAll {
	id: string;
	clientId: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
	client: Client;
}

export interface Client {
	id: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
}

export interface Contact {
	id: string;
	clientId: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
}
