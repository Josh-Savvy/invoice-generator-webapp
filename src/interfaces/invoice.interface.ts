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

export interface Currency {
	iso: string;
	name: string;
	symbol: string;
}

export interface PaymentMethod {
	bank: string;
	account_name: string;
	account_number: string;
}

export interface InvoiceItem {
	name: string;
	description: string;
	price: number;
	currency: Currency;
	quantity: number;
	rate: number;
}

export interface Client {
	email: string;
	avatar: string;
	isUser: boolean;
	last_name: string;
	first_name: string;
	phone_number: string;
}
export interface CreateInvoice {
	description: string;
	issue_date: string; // DD-MM-YYYY
	due_date: string; // DD-MM-YYYY
	currency: string; // currency iso
	billing_to?: string; // optional
	notes?: string; // optional
	client: {
		first_name: string;
		last_name: string;
		email: string;
		phone_number: string;
	};
	items: Omit<InvoiceItem, "price" | "currency">[];
	payment_method: {
		account_number: string;
		account_name: string;
		bank: string;
	};
}
