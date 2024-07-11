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
		<div className="min-h-[300vh] w-full lg:pr-5">
			<MainNav ctaComponent={<EditInvoiceCta {...{ invoiceId: parseInt(invoiceId) }} />} />
			<div className="grid grid-cols-12 gap-5 w-full mt-4">
				<div className="col-span-8 w-full">
					{params.type === "new" ? <CreateInvoiceForm /> : <EditInvoiceForm />}
				</div>
				<div className="bg-white col-span-4 min-h-24 w-full rounded-xl p-4"></div>
			</div>
		</div>
	);
};

export default EditInvoicePage;
