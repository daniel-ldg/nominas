import { Alignment, Icon, Navbar, NavbarGroup, NavbarHeading, ResizeSensor } from "@blueprintjs/core";
import { useState } from "react";
import MenuTabs from "./menu/MenuTabs";
import VersionControlButton from "./VersionControlButton";

const Header = props => {
	const [isCompact, setIsCompact] = useState(false);
	const COMPACT_MAX_WIDTH = 750;

	const handleResize = entries => {
		const width = entries[0].contentRect.width;
		const isActualCompact = width <= COMPACT_MAX_WIDTH;
		if (isActualCompact && !isCompact) {
			setIsCompact(true);
		} else if (!isActualCompact && isCompact) {
			setIsCompact(false);
		}
	};

	return (
		<ResizeSensor onResize={handleResize}>
			<Navbar>
				<NavbarGroup>
					<NavbarHeading>
						<Icon icon='manually-entered-data' /> {!isCompact && "Nóminas"}
					</NavbarHeading>
					<MenuTabs isCompact={isCompact} />
				</NavbarGroup>
				<NavbarGroup align={Alignment.RIGHT}>
					<VersionControlButton isCompact={isCompact} />
				</NavbarGroup>
			</Navbar>
		</ResizeSensor>
	);
};

export default Header;
