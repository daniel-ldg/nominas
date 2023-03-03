import { Button, Dialog, DialogBody, DialogFooter, Intent } from "@blueprintjs/core";
import { useState } from "react";
import CustomSelect2 from "./CustomSelect2";

const SelectDialog = ({ isOpen, onCancel, onSelect, items, title = "Agregar elemento", icon = "add" }) => {
	const [selected, setSelected] = useState(null);

	const onConfirm = () => {
		setSelected(null);
		onSelect(selected.value);
	};

	const onCancelHandler = () => {
		setSelected(null);
		onCancel();
	};

	const footerActions = (
		<>
			<Button onClick={onCancelHandler}>Cancelar</Button>
			<Button intent={Intent.PRIMARY} disabled={!selected} onClick={onConfirm}>
				Confirmar
			</Button>
		</>
	);

	return (
		<Dialog isOpen={isOpen} title={title} icon={icon} onClose={onCancelHandler}>
			<DialogBody>
				<CustomSelect2 items={items} onSelect={setSelected} selected={selected} />
			</DialogBody>
			<DialogFooter actions={footerActions} />
		</Dialog>
	);
};

export default SelectDialog;
