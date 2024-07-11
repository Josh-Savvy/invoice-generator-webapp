// &&
import { toast } from "@/components/ui/use-toast";
import type { Invoice } from "@/interfaces/invoice.interface";
import { useState, useContext, createContext } from "react";

interface InvoiceContextState {
	invoices: Invoice[];
	draft: Invoice[];
	addInvoice: (invoice: Invoice) => void;
	addToDraft: (invoice: Invoice) => void;
	updateInvoice: (invoice: Invoice) => void;
	deleteInvoice: (id: number) => void;
}

const initialInvoice: Invoice = {
	id: 13189212129801,
	reference: "INV-001",
	subject: null,
	tax_percentage: "10",
	is_paid: false,
	use_business_name: false,
	client: {
		email: "client@example.com",
		avatar: "/path/to/avatar.jpg",
		isUser: true,
		last_name: "Doe",
		first_name: "John",
		phone_number: "123-456-7890",
	},
	invoice_status: "Pending",
	due_date: new Date(),
	notes: "Example invoice notes.",
	currency: {
		iso: "USD",
		name: "US Dollar",
		symbol: "$",
	},
	payment_method: {
		bank: "Example Bank",
		account_name: "John Doe",
		account_number: "1234567890",
	},
	items: [
		{
			name: "Item 1",
			rate: 100,
			quantity: 2,
			description: "Example item 1",
			price: 200,
			currency: { iso: "USD", name: "US Dollar", symbol: "$" },
		},
		{
			name: "Item 2",
			rate: 50,
			quantity: 3,
			description: "Example item 2",
			price: 150,
			currency: { iso: "USD", name: "US Dollar", symbol: "$" },
		},
	],
	billing_to: "Company XYZ",
	billing_address: "123 Street, City, Country",
	created_by_id: 1,
	created_at: new Date(),
	updated_at: new Date(),
};

const initialState: InvoiceContextState = {
	invoices: [],
	draft: [],
	addInvoice: () => {},
	addToDraft: () => {},
	updateInvoice: () => {},
	deleteInvoice: () => {},
};

const InvoiceContext = createContext<InvoiceContextState>(initialState);

export const InvoiceContextProvider = ({ children }: { children?: React.ReactNode }) => {
	const [invoices, setInvoices] = useState<Invoice[]>([
		initialInvoice,
		{ ...initialInvoice, id: 2192081921 },
		{ ...initialInvoice, id: 21802192128 },
	]);
	const [draftInvoices, setDraftInvoices] = useState<Invoice[]>([]);

	const addInvoice = (invoice: Invoice) => {
		setDraftInvoices([...invoices, invoice]);
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify({}, null, 2)}</code>
				</pre>
			),
		});
	};

	const addToDraft = (invoice: Invoice) => {
		const isDraft = draftInvoices.find((f) => f.id === invoice.id) ? true : false;

		setDraftInvoices((prev) => {
			let updated = [...prev];
			isDraft ? (updated = updated.filter((d) => d.id !== invoice.id)) : updated.unshift(invoice);
			return updated;
		});
		toast({
			title: isDraft ? "Invoice removed from drafts" : "Invoice added to drafts",
			className: isDraft ? "bg-red-100 text-red-500 border-1 border-red-500" : "bg-green-500 text-white",
		});
	};

	const updateInvoice = (updatedInvoice: Partial<Invoice>) => {
		setInvoices(
			invoices.map((invoice) =>
				invoice.id === updatedInvoice.id
					? { ...invoice, ...updatedInvoice, id: invoice.id, reference: invoice.reference }
					: invoice,
			),
		);
		toast({ title: "Invoice updated", className: "bg-green-500 text-white" });
	};

	const deleteInvoice = (id: number) => {
		setInvoices(invoices.filter((invoice) => invoice.id !== id));
		toast({ title: "Invoice Removed", className: "border-2 border-main" });
	};

	return (
		<InvoiceContext.Provider
			value={{ addToDraft, draft: draftInvoices, invoices, addInvoice, updateInvoice, deleteInvoice }}>
			{children}
		</InvoiceContext.Provider>
	);
};

export const useInvoiceContext = () => useContext(InvoiceContext);
