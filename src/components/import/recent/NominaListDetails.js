import { Alert, AnchorButton, Classes, FormGroup, InputGroup, Intent, Label, Menu, MenuItem } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useState } from "react";
import { buildNominas } from "../../../business/catemp-handler";
import styles from "./Recent.module.css";

const NominaListDetails = ({ id, label, isFavorite, data, onNameChange, onSetFavorite, onDelete }) => {
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
	const showDeleteAlert = () => setIsDeleteAlertOpen(true);
	const hideDeleteAlert = () => setIsDeleteAlertOpen(false);

	const labelChangeHandler = event => {
		onNameChange(event.target.value, id);
	};

	const onSwitchFavorite = () => {
		onSetFavorite(!isFavorite, id);
	};

	const onDeleteConfirm = () => {
		onDelete(id);
		hideDeleteAlert();
	};

	const nominas = buildNominas(data);

	const actionButtons = (
		<>
			<Alert
				isOpen={isDeleteAlertOpen}
				cancelButtonText='Cancelar'
				confirmButtonText='Eliminar'
				icon='trash'
				intent={Intent.DANGER}
				onCancel={hideDeleteAlert}
				onConfirm={onDeleteConfirm}>
				<p>¿Está seguro que desea eliminar la lista de nóminas '{label}'?</p>
			</Alert>
			<Tooltip2 content={isFavorite ? "Quitar favorito" : "Marcar como favorito"}>
				<AnchorButton
					icon='bookmark'
					intent={isFavorite ? Intent.PRIMARY : Intent.NONE}
					minimal={!isFavorite}
					onClick={onSwitchFavorite}
				/>
			</Tooltip2>
			<Tooltip2 content='Eliminar'>
				<AnchorButton icon='trash' intent={Intent.DANGER} minimal={true} onClick={showDeleteAlert} />
			</Tooltip2>
		</>
	);

	return (
		<>
			<FormGroup label='Nombre' labelFor='label-input'>
				<InputGroup
					id='label-input'
					leftIcon='tag'
					value={label}
					onChange={labelChangeHandler}
					rightElement={actionButtons}
				/>
			</FormGroup>
			<Label>
				Nóminas
				<span className={Classes.TEXT_MUTED}>{` ${nominas.length} ${
					nominas.length === 1 ? "nómina" : "nóminas"
				} en esta lista`}</span>
				<Menu className={styles.nominasList}>
					{nominas.map((item, i) => (
						<MenuItem key={i} className={styles.nominaListItem} text={item.nombre} label={item.rfc} icon='person' />
					))}
				</Menu>
			</Label>
		</>
	);
};

export default NominaListDetails;
