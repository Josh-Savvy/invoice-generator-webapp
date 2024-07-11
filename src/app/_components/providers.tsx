"use client";
import { InvoiceContextProvider } from "@/contexts/invoice.context";
import React, { ReactNode } from "react";

type Props = { children?: ReactNode };

const AppProviders = ({ children }: Props) => {
	return <InvoiceContextProvider>{children}</InvoiceContextProvider>;
};

export default AppProviders;
