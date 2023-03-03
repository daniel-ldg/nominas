import { Icon, Position } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";

const HelpIcon = props => {
	return (
		<Tooltip2 content={props.message} position={Position.TOP}>
			<Icon icon='help' />
		</Tooltip2>
	);
};

export default HelpIcon;
