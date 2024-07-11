import type { Metadata } from "next";
import { AR_One_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Sidebar from "@/components/layout/sidebar";
import AppProviders from "./_components/providers";

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
				<body className={clsx(font.className, "bg-_background p-2 flex items-start gap-5")}>
					<Sidebar />
					<section className="w-full py-3">{children}</section>
				</body>
			</AppProviders>
		</html>
	);
}
