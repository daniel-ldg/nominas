import { Classes, Dialog, DialogBody, NonIdealState } from "@blueprintjs/core";
import { useContext, useEffect, useState } from "react";
import { LocalStorageContext } from "../../../store/LocalStorageContext";
import styles from "./Recent.module.css";
import NominaListCard from "./NominaListCard";
import NominaListDetails from "./NominaListDetails";
import RecentDialogFooter from "./RecentDialogFooter";

const RecentDialog = ({ isOpen, onCancel, onImport }) => {
	const localStorageCtx = useContext(LocalStorageContext);
	const [active, setActive] = useState();

	useEffect(() => {
		setActive(localStorageCtx.imports.at(0)?.id);
	}, [isOpen, localStorageCtx.imports.length]);

	const importButtonHandler = () => {
		const activeItem = localStorageCtx.imports.find(item => item.id === active);
		let csv = (({ data, label }) => ({ data, label }))(activeItem);
		onImport(csv);
	};

	return (
		<Dialog
			className={styles.recentDialog}
			title='Cargar lista de nóminas reciente'
			icon='history'
			isOpen={isOpen}
			onClose={onCancel}>
			<div className={Classes.MULTISTEP_DIALOG_PANELS} style={{ marginTop: "1px" }}>
				<div className={`${Classes.MULTISTEP_DIALOG_LEFT_PANEL} ${styles.recentDialogPanel}`}>
					{localStorageCtx.imports.map((item, i) => (
						<NominaListCard {...item} key={i} isActive={active === item.id} onClick={() => setActive(item.id)} />
					))}
				</div>
				<div className={`${Classes.MULTISTEP_DIALOG_RIGHT_PANEL} ${styles.recentDialogPanel}`}>
					{active && (
						<DialogBody>
							<NominaListDetails
								{...localStorageCtx.imports.find(item => item.id === active)}
								onNameChange={localStorageCtx.renameImport}
								onSetFavorite={localStorageCtx.onSetImportFavorite}
								onDelete={localStorageCtx.removeSavedImport}
							/>
						</DialogBody>
					)}
					{!active && <NonIdealState icon='warning-sign' description='No hay listas de nóminas recientes' />}
					<RecentDialogFooter
						{...localStorageCtx.imports.find(item => item.id === active)}
						onImport={importButtonHandler}
					/>
				</div>
			</div>
		</Dialog>
	);
};

export default RecentDialog;
