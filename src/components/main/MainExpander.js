import { Card } from "@blueprintjs/core";
import { useContext } from "react";
import NominaContext from "../../store/NominaContext";
import { TABS_ID } from "../../store/NominaContextProvider";
import Export from "../export/Export";
import Import from "../import/Import";
import Modify from "../modify/Modify";
import Select from "../select/Select";
import Verify from "../verify/Verify";

const MainExpander = props => {
	const nominasCtx = useContext(NominaContext);
	return (
		<Card>
			<Import hidden={nominasCtx.currentTab !== TABS_ID.IMPORTAR} />
			<Select hidden={nominasCtx.currentTab !== TABS_ID.SELECCIONAR} />
			<Modify hidden={nominasCtx.currentTab !== TABS_ID.MODIFICAR} />
			<Export hidden={nominasCtx.currentTab !== TABS_ID.EXPORTAR} />
			<Verify hidden={nominasCtx.currentTab !== TABS_ID.VERIFICAR} />
		</Card>
	);
};

export default MainExpander;
