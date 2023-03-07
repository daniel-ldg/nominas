import { Button, Classes, Text } from "@blueprintjs/core";
import { useState } from "react";
import VersionControlModal from "./VersionControlModal";

const VersionControlButton = props => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<VersionControlModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
			<Button className={Classes.MINIMAL} icon='git-branch' onClick={() => setIsOpen(true)}>
				{!props.isCompact && <Text className={Classes.TEXT_MUTED}>2.0.0b</Text>}
			</Button>
		</>
	);
};

export default VersionControlButton;
