import type { Metadata } from "next";
import { AR_One_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Sidebar from "@/components/layout/sidebar";
import AppProviders from "./_components/providers";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const font = AR_One_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = { title: { template: "%s | Home", default: "Invoice Master" } };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<AppProviders>
				<body className={font.className}>
					<NextTopLoader />
					<Toaster />
					<main className="bg-_background p-2 sm:flex items-start gap-5 w-full">
						<Sidebar />
						<section className="w-full py-3 overflow-x-hidden min-h-screen">{children}</section>
					</main>
				</body>
			</AppProviders>
		</html>
	);
}
