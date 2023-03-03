import { AnchorButton } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { useContext, useState } from "react";
import { LocalStorageContext } from "../../store/LocalStorageContext";
import RecentDialog from "./recent/RecentDialog";

const LoadRecent = ({ onImport }) => {
	const localStorageCtx = useContext(LocalStorageContext);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	const recentImportsFound = localStorageCtx.imports.length > 0;

	const tooltipContent = recentImportsFound
		? `${localStorageCtx.imports.length} Listas de nóminas encontradas`
		: "No hay nóminas recientes";

	const importHandler = csv => {
		closeDialog();
		onImport(csv);
	};

	return (
		<>
			<RecentDialog isOpen={isDialogOpen} onCancel={closeDialog} onImport={importHandler} />
			<Tooltip2 fill content={tooltipContent}>
				<AnchorButton fill outlined icon='history' disabled={localStorageCtx.imports.length === 0} onClick={openDialog}>
					Cargar lista de nóminas reciente
				</AnchorButton>
			</Tooltip2>
		</>
	);
};

export default LoadRecent;
