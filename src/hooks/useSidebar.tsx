import { useState } from "react";

type UseSidebarHook = {
	isOpen: boolean;
	toggleSidebar: () => void;
	openSidebar: () => void;
	closeSidebar: () => void;
};

const useSidebar = (): UseSidebarHook => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen((p) => !p);
		console.log("toggleSidebar");
	};
	const openSidebar = () => setIsOpen(true);
	const closeSidebar = () => setIsOpen(false);

	return { isOpen, toggleSidebar, openSidebar, closeSidebar };
};

export default useSidebar;
