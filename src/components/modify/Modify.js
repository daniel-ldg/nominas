import { useContext } from "react";
import NominaContext from "../../store/NominaContext";
import ConfigSelector from "./config/ConfigSelector";
import Deducciones from "./Deducciones";
import Otrospagos from "./Otrospagos";
import Percepciones from "./Percepciones";

const Modify = props => {
	const nominasCtx = useContext(NominaContext);

	return (
		<div style={{ display: props.hidden ? "none" : "block" }}>
			<ConfigSelector onSetConfig={nominasCtx.onChangeCurrentConfig} current={nominasCtx.currentConfig} />
			<Percepciones
				percepciones={nominasCtx.currentConfig.percepciones}
				for={nominasCtx.selected}
				onUpdateDataGravado={nominasCtx.onUpdatePercepcionDataGravado}
				onUpdateDataExento={nominasCtx.onUpdatePercepcionDataExento}
			/>
			<Otrospagos
				otrospagos={nominasCtx.currentConfig.otrospagos}
				for={nominasCtx.selected}
				onUpdateData={nominasCtx.onUpdateOtropagoData}
			/>
			<Deducciones
				deducciones={nominasCtx.currentConfig.deducciones}
				for={nominasCtx.selected}
				onUpdateData={nominasCtx.onUpdateDeduccionData}
			/>
		</div>
	);
};

export default Modify;
