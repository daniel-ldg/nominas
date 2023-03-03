import { Button, Dialog, DialogBody, DialogFooter, HTMLSelect, Intent } from "@blueprintjs/core";
import { useState } from "react";

const AddDialog = ({
	options,
	title = "Agregar elemento",
	placeholder = "Seleccionar elemento",
	icon = "add",
	isOpen,
	onAdd,
	onCancel,
}) => {
	const [selected, setSelected] = useState(null);
	const selectPlaceholder = { label: placeholder, value: -1, disabled: true };
	const selectOptions = [selectPlaceholder, ...options.map((option, i) => ({ ...option, key: i, value: i }))];

	const changeHandler = event => {
		setSelected(event.currentTarget.value);
	};

	const addHandler = () => {
		let selectedItem = options[selected].item;
		onAdd(selectedItem);
	};

	const actions = (
		<>
			<Button onClick={onCancel}>Cancelar</Button>
			<Button intent={Intent.PRIMARY} disabled={!selected} onClick={addHandler}>
				Agregar
			</Button>
		</>
	);
	return (
		<Dialog isOpen={isOpen} onClose={onCancel} title={title} icon={icon}>
			<DialogBody>
				<HTMLSelect
					fill={true}
					defaultValue={selectPlaceholder.value}
					onChange={changeHandler}
					options={selectOptions}
				/>
			</DialogBody>
			<DialogFooter actions={actions} />
		</Dialog>
	);
};

export default AddDialog;
