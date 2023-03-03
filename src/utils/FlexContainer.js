const FlexContainer = props => {
	const isHorizontal = props.horizontal === true;
	return (
		<div
			ref={props.innerRef}
			className={props.className}
			style={{ display: "flex", flexDirection: isHorizontal ? "row" : "column" }}>
			{props.children}
		</div>
	);
};

export default FlexContainer;
