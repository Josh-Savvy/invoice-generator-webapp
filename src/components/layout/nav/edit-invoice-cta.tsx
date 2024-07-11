"use client";
import { Button } from "@/components/ui/button";
import { useInvoiceContext } from "@/contexts/invoice.context";
import type { Invoice } from "@/interfaces/invoice.interface";
import clsx from "clsx";
import { Eye } from "lucide-react";
import React from "react";

const EditInvoiceCta = ({ invoiceId }: { invoiceId: number }) => {
	const { addToDraft, invoices, draft } = useInvoiceContext();
	const invoice =
		invoices.find((f) => f.id === invoiceId || f.reference === String(invoiceId)) ||
		({ id: Date.now() } as Invoice);
	const isDraft = draft.find((f) => f.id === invoiceId || f.reference === String(invoiceId)) ? true : false;

	return (
		<div className="flex items-center gap-4">
			<Button
				variant={"outline"}
				className="rounded-xl text-sm text-black bg-white border-_neutral flex items-center gap-2">
				<Eye size={18} />
				<p className="tracking-tight">Preview</p>
			</Button>
			<Button
				variant={"outline"}
				className={clsx(
					"tracking-tight rounded-xl text-sm",
					isDraft ? "text-[#888] bg-[#ccc]" : "text-_primary bg-_secondary",
				)}
				onClick={() => (invoice ? addToDraft(invoice) : {})}>
				{isDraft ? "Remove from" : "Save to"} drafts
			</Button>
			<Button variant={"outline"} className="tracking-tight rounded-xl text-sm bg-_primary text-white">
				Download
			</Button>
		</div>
	);
};

export default EditInvoiceCta;
