import { Position } from "@blueprintjs/core";
import { Classes, Tooltip2 } from "@blueprintjs/popover2";

const HelpEmphasized = props => {
	return (
		<Tooltip2 content={props.message} className={Classes.TOOLTIP2_INDICATOR} position={Position.TOP}>
			<em>{props.text}</em>
		</Tooltip2>
	);
};

export default HelpEmphasized;
