import { Code, Icon, Position } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";

const HelpReference = props => {
	return (
		<Tooltip2
			content={
				<>
					<Icon icon='info-sign' /> {props.message}
				</>
			}
			position={Position.TOP}>
			<Code>{props.word}</Code>
		</Tooltip2>
	);
};

export default HelpReference;
