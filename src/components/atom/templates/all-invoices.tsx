"use client";
import { useInvoiceContext } from "@/contexts/invoice.context";
import React from "react";
import InvoiceListCard from "../cards/invoice-list-card";

const AllInvoicesTemplate = () => {
	const { invoices } = useInvoiceContext();
	return (
		<section className="grid gap-2">
			<div className="">
				{invoices.map((item) => (
					<InvoiceListCard key={item.id} {...item} />
				))}
			</div>
            {/* // Todo: list invoices by status */}
			{/* <div className=""></div> */}
		</section>
	);
};

export default AllInvoicesTemplate;
