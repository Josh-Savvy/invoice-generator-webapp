"use client";

import {
	Box,
	CircleHelp,
	FileBarChart2,
	FileText,
	LayoutDashboard,
	LayoutPanelTop,
	Settings,
	Users,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
	const [activeItem, setActiveItem] = useState<ISidebarItem>(sidebar_items[0].items[0]);
	const path = usePathname();
	useMemo(() => {
		let found = false;
		sidebar_items.forEach((section) => {
			section.items.forEach((item) => {
				if (path.startsWith(String(item.link))) {
					setActiveItem(item);
					found = true;
				}
			});
			if (found) return;
		});
	}, [path]);

	return (
		<div className="max-w-[20vw] w-full h-[96vh] sticky top-4 bg-black rounded-xl p-3">
			<div className="my-2 pb-4 flex gap-2 items-center text-white">
				<FileBarChart2 />
				<p className="uppercase text-xl tracking-tight" style={{ fontFamily: "monospace" }}>
					Invoice Master
				</p>
			</div>
			<div className="w-full grid gap-5">
				{sidebar_items.map((item, index) => {
					return (
						<div key={index}>
							<h1 className="text-[13px] tracking-tight uppercase text-white">{item.section}</h1>
							<ul className="w-full gap-2 grid mt-3 px-3">
								{item.items.map((val, i) => {
									const is_active = val === activeItem;
									return (
										<li className="w-full" key={i} onClick={() => setActiveItem(val)}>
											<SidebarItem {...{ item: val, is_active }} />
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const SidebarItem = ({ is_active, item }: { item: ISidebarItem; is_active: boolean }) => {
	const Icon = item.icon;
	return (
		<Link href={item.link || "#"}>
			<Button
				className={clsx(
					is_active ? "bg-_primary hover:bg-[#6e41d8]" : "bg-transparent",
					"grid grid-cols-12 items-center gap-2 w-full",
				)}>
				<span className="col-span-2">
					<Icon size={15} />
				</span>
				<p className="col-span-10 flex justify-start text-sm tracking-tight">{item.label}</p>
			</Button>
		</Link>
	);
};

type ISidebarItem = { label: string; icon: any; link?: string };

const sidebar_items: { section: string; items: ISidebarItem[] }[] = [
	{
		section: "Dashboard",
		items: [
			{ icon: LayoutDashboard, label: "Overview", link: "/" },
			{ icon: FileText, label: "Invoices", link: "/invoices" },
			{ icon: Users, label: "Clients", link: "#" },
			{ icon: Box, label: "Products", link: "#" },
		],
	},
	{
		section: "Others",
		items: [
			{ icon: LayoutPanelTop, label: "Templates", link: "#" },
			{ icon: CircleHelp, label: "Help and Support", link: "#" },
			{ icon: Settings, label: "Settings", link: "#" },
		],
	},
];

export default Sidebar;
