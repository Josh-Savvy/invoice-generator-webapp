export interface Invoice {
	id: number;
	reference: string;
	subject: null;
	tax_percentage: string;
	is_paid: boolean;
	use_business_name: boolean;
	client: Client;
	invoice_status: string;
	due_date: Date;
	notes: string;
	currency: Currency;
	payment_method: PaymentMethod;
	items: InvoiceItem[];
	billing_to: string;
	billing_address: string;
	created_by_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface Client {
	email: string;
	avatar: string;
	isUser: boolean;
	last_name: string;
	first_name: string;
	phone_number: string;
}

export interface Currency {
	iso: string;
	name: string;
	symbol: string;
}

export interface InvoiceItem {
	name: string;
	rate: number;
	quantity: number;
	description: string;
}

export interface PaymentMethod {
	bank: string;
	account_name: string;
	account_number: string;
}
