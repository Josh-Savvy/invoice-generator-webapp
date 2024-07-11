import CreateInvoiceForm from "@/components/atom/forms/create-invoice-form";
import MainNav from "@/components/layout/nav";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
	params: { type: "edit" | "new"; invoiceId: string };
};

const EditInvoicePage = ({ params }: Props) => {
	const required = ["edit", "new"];
	if (!required.includes(params.type)) redirect("/invoices");
	return (
		<div className="min-h-[300vh] w-full lg:pr-5">
			<MainNav />
			<div className="grid grid-cols-12 gap-5 w-full mt-4">
				<div className="col-span-8 w-full">
					<CreateInvoiceForm />
				</div>
				<div className="bg-white col-span-4 min-h-24 w-full rounded-xl p-4"></div>
			</div>
		</div>
	);
};

export default EditInvoicePage;
