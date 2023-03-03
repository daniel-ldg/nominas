import { Classes, FormGroup, Intent, Tag, Text } from "@blueprintjs/core";

const ListItem = props => {
	let tag = {};
	if (props?.isValid === 1) {
		tag.intent = Intent.SUCCESS;
		tag.message = "Encontrado";
		tag.icon = "tick-circle";
	} else if (props?.isValid === 0) {
		tag.intent = Intent.DANGER;
		tag.message = "No encontrado";
		tag.icon = "error";
	} else if (props?.isValid === -1) {
		tag.intent = Intent.NONE;
		tag.message = "Duplicado";
		tag.icon = "error";
	}

	return (
		<FormGroup>
			<Text>
				{props.isValid !== undefined && (
					<Tag
						style={{ width: "130px", marginRight: "10px" }}
						rightIcon={tag.icon}
						className={Classes.BUTTON}
						intent={tag.intent}>
						{tag.message}
					</Tag>
				)}
				{props.value}
			</Text>
		</FormGroup>
	);
};

export default ListItem;
