import { z } from "zod";

export const InvoiceItemSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	quantity: z.number().positive({ message: "Quantity must be a positive number" }),
	rate: z.number().positive({ message: "Rate must be a positive number" }),
});

export const ClientSchema = z.object({
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
	email: z.string().email({ message: "Invalid email address" }),
	phone_number: z.string().min(1, { message: "Phone number is required" }),
	avatar: z.string().optional(),
});

export const PaymentMethodSchema = z.object({
	account_number: z.string().min(1, { message: "Account number is required" }),
	account_name: z.string().min(1, { message: "Account name is required" }),
	bank: z.string().min(1, { message: "Bank name is required" }),
});

export const CreateInvoiceSchema = z.object({
	description: z.string().min(1, { message: "Description is required" }),
	due_date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, { message: "Due date must be in DD-MM-YYYY format" }),
	currency: z.string().length(3, { message: "Currency must be a 3-letter ISO code" }),
	billing_address: z.string().optional(),
	billing_to: z.string().optional(),
	notes: z.string().optional(),
	client: ClientSchema,
	items: z.array(InvoiceItemSchema).min(1, { message: "At least one item is required" }),
	payment_method: PaymentMethodSchema,
});
