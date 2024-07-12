import CreateInvoiceForm from "@/components/atom/forms/create-invoice-form";
import EditInvoiceForm from "@/components/atom/forms/edit-invoice-form";
import MainNav from "@/components/layout/nav";
import EditInvoiceCta from "@/components/layout/nav/edit-invoice-cta";
import { redirect } from "next/navigation";
import React from "react";

type Params = { params: { type: "edit" | "new"; invoiceId: string } };

const EditInvoicePage = ({ params: { invoiceId, ...params } }: Params) => {
	const required = ["edit", "new"];
	if (!required.includes(params.type)) redirect("/invoices");

	return (
		<div className="min-h-[100vh] w-full h-full sm:pr-3">
			<MainNav
				ctaComponent={
					params.type === "edit" ? <EditInvoiceCta {...{ invoiceId: parseInt(invoiceId) }} /> : <></>
				}
			/>
			<br />
			{params.type === "new" ? <CreateInvoiceForm /> : <EditInvoiceForm />}
		</div>
	);
};

export default EditInvoicePage;
