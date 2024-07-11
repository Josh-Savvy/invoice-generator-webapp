import type { Invoice } from "@/interfaces/invoice.interface";
import Link from "next/link";
import React from "react";

const InvoiceListCard = ({ ...invoice }: Invoice) => {
	return (
		<div>
			REF: #{invoice.reference}
			<Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>
		</div>
	);
};

export default InvoiceListCard;
