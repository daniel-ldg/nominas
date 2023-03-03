import { Divider } from "@blueprintjs/core";

const DEFAULT_HEIGHT = 12;

const Spacer = props => {
	const height = props.useDivider ? (props.height || DEFAULT_HEIGHT) / 2 : props.height;

	return (
		<>
			<div style={{ height: `${height}px` }}></div>
			{props.useDivider && (
				<>
					<Divider />
					<div style={{ height: `${height}px` }}></div>
				</>
			)}
		</>
	);
};

export default Spacer;
