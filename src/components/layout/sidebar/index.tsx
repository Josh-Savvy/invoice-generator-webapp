"use client";

import {
	Box,
	CircleHelp,
	FileBarChart2,
	FileText,
	LayoutDashboard,
	LayoutPanelTop,
	Menu,
	Settings,
	Users,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "../../ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSidebar from "@/hooks/useSidebar";
import useWindow from "@/hooks/useWindow";

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
	const { isOpen, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
	const { width } = useWindow();
	const isMobile = useMemo(() => Number(width) <= 640, [width]);

	return (
		<>
			<div className="sm:hidden flex justify-between items-center py-4 sticky top-0 bg-_background z-40">
				<Link href="/">
					<div className="flex gap-1 items-center text-_primary relative">
						<FileBarChart2 />
						<p className="uppercase text-xl tracking-tight" style={{ fontFamily: "monospace" }}>
							Invoice Master
						</p>
					</div>
				</Link>
				<Menu onClick={toggleSidebar} className="cursor-pointer" size={24} />
			</div>
			{isOpen && (
				<div onClick={closeSidebar} className="z-50 bg-black/20 fixed left-0 top-0 h-full w-full sm:hidden" />
			)}
			<div
				className={clsx(
					isOpen ? "w-[65%] translate-x-0" : "w-0 sm:w-full sm:translate-x-0 -translate-x-[100vw]",
					"sm:sticky left-0 fixed sm:max-w-[6em] lg:max-w-[15em] sm:h-[96vh] h-[100vh] top-0 sm:top-4 bg-black rounded-tr-xl rounded-br-xl sm:rounded-xl p-3 duration-300 z-50",
				)}>
				<div className="my-2 pb-4 flex gap-1 items-center text-white relative">
					<FileBarChart2 />
					<p className="hidden lg:flex uppercase text-xl tracking-tight" style={{ fontFamily: "monospace" }}>
						Invoice Master
					</p>
					<p
						className="lg:hidden uppercase sm:text-xl text-lg tracking-tight"
						style={{ fontFamily: "monospace" }}>
						IM
					</p>
					<div className="sm:hidden absolute right-5">
						<div
							className="text-white text-[2em] font-semibold tracking-tight select-none cursor-pointer"
							onClick={closeSidebar}>
							&times;
						</div>
					</div>
				</div>
				<div className="w-auto grid gap-5">
					{sidebar_items.map((item, index) => {
						return (
							<div key={index}>
								<h1 className="flex xs:hidden xl:flex text-[13px] tracking-tight uppercase text-white">
									{item.section}
								</h1>
								<ul className="w-full gap-2 grid mt-3 px-3">
									{item.items.map((val, i) => {
										const is_active = val === activeItem;
										return (
											<li
												className="w-full"
												key={i}
												onClick={() => {
													setActiveItem(val);
													if (isMobile) closeSidebar();
												}}>
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
		</>
	);
};

const SidebarItem = ({ is_active, item }: { item: ISidebarItem; is_active: boolean }) => {
	const Icon = item.icon;
	return (
		<Link href={item.link || "#"}>
			<Button
				className={clsx(
					is_active ? "bg-_primary hover:bg-[#6e41d8]" : "bg-transparent",
					"flex gap-2 w-full items-center justify-start sm:justify-center lg:justify-start",
				)}>
				<span className="col-span-2">
					<Icon size={18} />
				</span>
				<p className="col-span-10 flex sm:hidden lg:flex justify-start text-sm tracking-tight">{item.label}</p>
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
