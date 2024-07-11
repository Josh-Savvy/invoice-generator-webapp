import React from "react";
import NavigatorComponent from "./navigator-component";

type Props = {};

const MainNav = (props: Props) => {
	return (
		<div className="flex items-center justify-between">
			<NavigatorComponent />
			<div className="flex items-center gap-4">
				<div className=""></div>
			</div>
		</div>
	);
};

export default MainNav;
