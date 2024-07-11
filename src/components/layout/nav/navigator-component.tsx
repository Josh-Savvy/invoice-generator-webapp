"use client";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, ArrowRight, FileText, Users } from "lucide-react";
import clsx from "clsx";

type Params = { type: string };

const NavigatorComponent = () => {
	const _path = usePathname();
	const params = useParams<Params>();
	const path = useMemo(() => _path.split("/")[1] || "", [_path]);
	const BreadCrumbIcon = useMemo(() => breadCrumbIcons[path], [path]);
	const [canGoForward, setCanGoForward] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== "undefined") setCanGoForward(window?.history.length >= 1);
		console.log({ l: window?.history});
		return () => {
			if (typeof window !== "undefined") setCanGoForward(window?.history.length >= 1);
		};
	}, []);

	return (
		<div className="flex items-center gap-3 select-none">
			<div className="flex items-center gap-3">
				<ArrowLeft size={18} className="cursor-pointer" onClick={() => window?.history.back()} color="#000" />
				<ArrowRight
					size={18}
					className={clsx("cursor-pointer")}
					onClick={() => (canGoForward ? window?.history.forward() : {})}
					color={canGoForward ? "#000" : "#ccc"}
				/>
			</div>
			<Breadcrumb className="!cursor-default">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink className="capitalize flex gap-2 items-center">
							{BreadCrumbIcon ? <BreadCrumbIcon size={16} color="#7D4BF6" /> : <></>}
							<p className="tracking-tight text-sm">{path}</p>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="capitalize tracking-tight text-sm">{params.type}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

const breadCrumbIcons: Record<string, any> = {
	invoices: FileText,
	clients: Users,
	// ...more
};

export default NavigatorComponent;
