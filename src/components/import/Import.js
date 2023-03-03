import { Blockquote, Button, Code, FormGroup, H5, Intent, Text, TextArea } from "@blueprintjs/core";
import { useContext, useEffect, useState } from "react";
import { buildNominas } from "../../business/catemp-handler";
import { LocalStorageContext } from "../../store/LocalStorageContext";
import NominaContext from "../../store/NominaContext";
import { pluralize } from "../../utils/Strings";
import { ToasterSingleton } from "../../utils/ToasterSingleton";
import HelpEmphasized from "../ui/hover/HelpEmphasized";
import LoadFile from "./LoadFile";
import LoadRecent from "./LoadRecent";

const Import = props => {
	const [csv, setCsv] = useState({ data: "" });
	const [nominas, setNominas] = useState([]);
	const nominasCtx = useContext(NominaContext);
	const localStorageCtx = useContext(LocalStorageContext);

	useEffect(() => {
		const nominas = buildNominas(csv.data);
		setNominas(nominas);
	}, [csv.data]);

	useEffect(() => {
		if (csv.label) {
			ToasterSingleton.showLoad(csv);
		}
	}, [csv.label]);

	const importHandler = () => {
		nominasCtx.onSetImported(nominas);
		localStorageCtx.addImport(csv.data);
	};

	const textChangeHandler = event => {
		setCsv(prevState => ({ ...prevState, data: event.target.value }));
	};

	const errores = nominas.filter(nomina => !nomina.isValid()).length;
	const isValid = nominas.length !== 0 && errores === 0;

	const textAreaMessage = (
		<Text>
			{`${nominas.length} ${pluralize("Nómina encontrada", "Nominas encontradas", nominas.length)}. `}
			{errores !== 0 ? `(${errores} ${pluralize("error encontrado", "errores encontrados", errores)}.)` : ""}
		</Text>
	);

	return (
		<div style={{ display: props.hidden ? "none" : "block" }}>
			<H5>Importar lista de nóminas</H5>
			<Blockquote>
				Puedes elegir una{" "}
				<HelpEmphasized
					text='lista de nominas usada recientemente'
					message='Las listas de nóminas que uses se guardarán automáticamente'
				/>{" "}
				o elegir archivo <Code>CSV</Code> para cargar su contenido, o copiar y pegar el contenido en el cuadro de texto.
			</Blockquote>
			<LoadRecent onImport={setCsv} />
			<LoadFile onImport={setCsv} />

			<FormGroup
				label='Cuadro de texto'
				helperText={textAreaMessage}
				intent={csv.data !== "" && !isValid ? Intent.DANGER : Intent.NONE}>
				<TextArea
					fill={true}
					placeholder='Copiar y pegar aquí'
					rows='10'
					growVertically={false}
					style={{ resize: "none", whiteSpace: "pre" }}
					spellCheck='false'
					autoComplete='false'
					autoCapitalize='false'
					value={csv.data}
					intent={csv.data !== "" && !isValid ? Intent.DANGER : Intent.NONE}
					onChange={textChangeHandler}
				/>
			</FormGroup>
			<Button fill intent={Intent.PRIMARY} disabled={csv.data === "" || !isValid} onClick={importHandler}>
				{nominasCtx.imported.length === 0 ? "Importar" : "Actualizar nominas importadas"}
			</Button>
		</div>
	);
};

export default Import;
