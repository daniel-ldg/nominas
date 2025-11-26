import { Button, Classes, Drawer, DrawerSize, Icon, Intent, Position } from "@blueprintjs/core";
import { useState } from "react";
import { ToasterSingleton } from "../../../../utils/ToasterSingleton";
import DeduccionesConfig from "./DeduccionesConfig";
import OpcionesConfig from "./OpcionesConfig";
import OtrospagosConfig from "./OtrospagosConfig";
import PercepcionesConfig from "./PercepcionesConfig";

const ConfigDrawer = ({ isOpen, config, onHide, onSaveConfig }) => {
	const [opciones, setOpciones] = useState([]);
	const [percepciones, setPercepciones] = useState([]);
	const [otrospagos, setOtrospagos] = useState([]);
	const [deducciones, setDeducciones] = useState([]);

	const loadConfig = () => {
		setOpciones(config.opciones);
		setPercepciones(config.percepciones);
		setOtrospagos(config.otrospagos);
		setDeducciones(config.deducciones);
	};

	const saveConfig = () => {
		let newConfig = { ...config };
		newConfig.percepciones = percepciones;
		newConfig.otrospagos = otrospagos;
		newConfig.deducciones = deducciones;
		newConfig.opciones = opciones;
		onSaveConfig(newConfig);
		ToasterSingleton.clear();
	};

	return (
		<Drawer
			isOpen={isOpen}
			onClose={onHide}
			icon={"settings"}
			position={Position.TOP}
			size={DrawerSize.LARGE}
			title={"Configuración personalizada"}
			onOpening={loadConfig}
			onClosing={saveConfig}>
			<div className={Classes.DRAWER_BODY}>
				<div className={Classes.DIALOG_BODY}>
					<OpcionesConfig opciones={opciones} onChange={setOpciones} />
					<PercepcionesConfig percepciones={percepciones} onUpdate={setPercepciones} />
					<OtrospagosConfig otrospagos={otrospagos} percepciones={percepciones} onUpdate={setOtrospagos} />
					<DeduccionesConfig deducciones={deducciones} onUpdate={setDeducciones} />
				</div>
			</div>
			<div className={Classes.DRAWER_FOOTER}>
				<Button
					fill
					intent={Intent.PRIMARY}
					onClick={() => {
						saveConfig();
						onHide();
					}}>
					Guardar cambios
				</Button>
			</div>
		</Drawer>
	);
};

export default ConfigDrawer;
