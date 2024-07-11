import type { Invoice } from "@/interfaces/invoice.interface";
import { useState, useContext, createContext } from "react";

interface InvoiceContextState {
	invoices: Invoice[];
	draft: Invoice[];
	addInvoice: (invoice: Invoice) => void;
	updateInvoice: (invoice: Invoice) => void;
	deleteInvoice: (id: number) => void;
}

const initialState: InvoiceContextState = {
	invoices: [],
	draft: [],
	addInvoice: () => {},
	updateInvoice: () => {},
	deleteInvoice: () => {},
};

const InvoiceContext = createContext<InvoiceContextState>(initialState);

export const InvoiceContextProvider = ({ children }: { children?: React.ReactNode }) => {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [draftInvoices, setDraftInvoices] = useState<Invoice[]>([]);

	const addInvoice = (invoice: Invoice, opts?: { is_draft?: boolean }) => {
		const { is_draft } = opts || {};
		if (is_draft) {
			setDraftInvoices([...invoices, invoice]);
			return;
		}
		setInvoices([...invoices, invoice]);
	};
	const updateInvoice = (updatedInvoice: Invoice) => {
		setInvoices(invoices.map((invoice) => (invoice.id === updatedInvoice.id ? updatedInvoice : invoice)));
	};

	const deleteInvoice = (id: number) => {
		setInvoices(invoices.filter((invoice) => invoice.id !== id));
	};

	return (
		<InvoiceContext.Provider value={{ draft: draftInvoices, invoices, addInvoice, updateInvoice, deleteInvoice }}>
			{children}
		</InvoiceContext.Provider>
	);
};

export const useInvoiceContext = () => useContext(InvoiceContext);
