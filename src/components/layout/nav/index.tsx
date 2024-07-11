import React, { ReactNode } from "react";
import NavigatorComponent from "./navigator-component";

type Props = { ctaComponent?: ReactNode };

const MainNav = ({ ctaComponent }: Props) => {
	return (
		<div className="flex items-center justify-between">
			<NavigatorComponent />
			{ctaComponent}
		</div>
	);
};

export default MainNav;
