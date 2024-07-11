import { useEffect, useState } from "react";

type WindowSize = {
	width: number | undefined;
	height: number | undefined;
};

const useWindow = (): WindowSize => {
	const [windowSize, setWindowSize] = useState<WindowSize>({ width: undefined, height: undefined });

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
};

export default useWindow;
