"use client";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useInvoiceContext } from "@/contexts/invoice.context";
import type { CreateInvoice, Invoice } from "@/interfaces/invoice.interface";
import { CreateInvoiceSchema } from "../../../..";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import UploadFileDialog from "../common/upload-file-dialog";
import Image from "next/image";
import type { UploadedFile } from "../common/upload-file-dialog/_components/file-uploader";

type Props = { className?: string };

const EditInvoiceForm = ({ className }: Props) => {
	const router = useRouter();
	const { invoiceId } = useParams<{ invoiceId: string }>();
	const { invoices } = useInvoiceContext();
	const [invoice, setInvoice] = useState<Invoice>(
		invoices.find((d) => d.id === parseInt(invoiceId) || d.reference === invoiceId) as Invoice,
	);

	const form = useForm<CreateInvoice>({ resolver: zodResolver(CreateInvoiceSchema), defaultValues });

	function onSubmit(data: CreateInvoice) {
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

	const _faker = useMemo<Pick<CreateInvoice["client"], "email" | "phone_number"> & { address: string }>(() => {
		return {
			address: `${faker.location.streetAddress()}, ${faker.location.streetAddress(true)}...`,
			email: faker.internet.exampleEmail(),
			phone_number: faker.phone.number(),
		};
	}, []);

	return (
		<div className="grid lg:grid-cols-12 gap-5 w-full mt-4">
			<div className="col-span-9 xl:col-span-8 w-full">
				<div className={clsx("rounded-xl bg-white p-5", className)}>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full grid grid-cols-12 gap-3 items-start">
							<div className="col-span-6 grid gap-3">
								{/* // Todo: company name should be here */}
								<div className="">{}</div>
								<div className="">
									<p className="text-sm">Issue Date</p>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-full justify-start text-left font-normal",
													!form.watch().issue_date && "text-muted-foreground",
												)}>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{form.watch().issue_date ? (
													format(form.watch().issue_date, "PPP")
												) : (
													<span>Select Date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={new Date(form.watch().issue_date)}
												onSelect={(date) => {
													console.log({ date, another: form.watch().issue_date });
													if (date) form.setValue("issue_date", date.toISOString());
												}}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
								<div className="">
									<p className="text-sm">Due Date</p>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-full justify-start text-left font-normal",
													!form.watch().due_date && "text-muted-foreground",
												)}>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{form.watch().due_date ? (
													format(form.watch().due_date, "PPP")
												) : (
													<span>Select Date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={new Date(form.watch().due_date)}
												onSelect={(date) => {
													if (date) form.setValue("due_date", date.toISOString());
												}}
												initialFocus
												fromDate={new Date(form.watch().issue_date) || new Date()}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
							<div className="col-span-6 h-44 w-full relative">
								<UploadFileDialog
									title="Company's logo"
									onUpload={(files) => {
										console.log({ files: files.length });
										const file = files.length > 0 ? files[0] : null;
										if (file) form.setValue("company_logo", file);
									}}
									triggerComponent={
										form.watch().company_logo ? (
											<Image
												src={(form.watch().company_logo as UploadedFile).preview}
												alt={(form.watch().company_logo as UploadedFile).name}
												width={48}
												height={48}
												loading="lazy"
												className="aspect-square w-full h-full rounded-md object-cover"
											/>
										) : null
									}
								/>
							</div>
							<div className="col-span-12 grid grid-cols-12 gap-2">
								<h1 className="col-span-12 text-lg font-semibold tracking-tight">
									Client&apos;s Details
								</h1>
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="client.email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email address</FormLabel>
												<FormControl>
													<Input
														placeholder={_faker.email}
														{...field}
														type="email"
														inputMode="email"
														className="focus-visible:ring-_primary placeholder:text-black/50 bg-_neutral rounded-xl"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="client.phone_number"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone number</FormLabel>
												<FormControl>
													<Input
														placeholder={_faker.phone_number}
														{...field}
														type="tel"
														inputMode="numeric"
														className="focus-visible:ring-_primary placeholder:text-black/50 bg-_neutral rounded-xl"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-12">
									<FormField
										control={form.control}
										name="billing_to"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Billing Address</FormLabel>
												<FormControl>
													<Textarea
														placeholder={_faker.address}
														{...field}
														className="focus-visible:ring-_primary placeholder:text-black/50 resize-none min-h-[10em] bg-_neutral rounded-xl"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</form>
					</Form>
				</div>
			</div>
			<div className="bg-white col-span-3 xl:col-span-4 min-h-24 w-full rounded-xl p-4"></div>
		</div>
	);
};

export default EditInvoiceForm;

const defaultValues = {
	billing_to: "",
	company_logo: null,
	client: {
		avatar: "",
		email: "",
		first_name: "",
		last_name: "",
		phone_number: "",
	},
	currency: "USD",
	description: "",
	issue_date: "",
	due_date: "",
	items: [],
	notes: "",
	payment_method: {
		account_name: "",
		account_number: "",
		bank: "",
	},
};
