"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useInvoiceContext } from "@/contexts/invoice.context";
import type { Invoice } from "@/interfaces/invoice.interface";

type Props = { className?: string };

const EditInvoiceForm = ({ className }: Props) => {
	const router = useRouter();
	const { invoiceId } = useParams<{ invoiceId: string }>();
	const { invoices } = useInvoiceContext();
	const [invoice, setInvoice] = useState<Invoice>(
		invoices.find((d) => d.id === parseInt(invoiceId) || d.reference === invoiceId) as Invoice,
	);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	if (!invoiceId || !invoice) router.replace("/invoices");

	return (
		<div className="grid lg:grid-cols-12 gap-5 w-full mt-4">
			<div className="col-span-8 w-full">
				<div className={clsx("rounded-xl bg-white p-5", className)}>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormDescription>This is your public display name.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</div>
			<div className="bg-white col-span-4 min-h-24 w-full rounded-xl p-4"></div>
		</div>
	);
};

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

export default EditInvoiceForm;
