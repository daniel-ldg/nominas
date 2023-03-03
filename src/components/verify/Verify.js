import { EditableText, H4, Intent, Label } from "@blueprintjs/core";
import { useContext, useState } from "react";
import NominaContext from "../../store/NominaContext";
import EditableList2 from "../ui/editableList2/EditableList2";
import styles from "./Verify.module.css";

const Verify = ({ hidden }) => {
	const [real, setReal] = useState("");
	const nominaCtx = useContext(NominaContext);

	const result = real
		.split("\n")
		.reduce(
			(prev, curr, i) =>
				prev +
				(Math.abs(+curr - nominaCtx.getFilledNominas().at(i)?.calcularSueldoAPagar() || 0) < 0.03 ? "OK\n" : "ERROR\n"),
			""
		);

	return (
		<div style={{ display: hidden ? "none" : "block" }}>
			<H4>Verificar sueldo a pagar</H4>
			<div className={styles.mainContainer}>
				<div className={styles.rfc}>
					<Label>Nóminas</Label>
					<EditableText
						className={styles.mono}
						disabled={true}
						value={nominaCtx.selected.reduce((prev, curr, i) => prev + (i !== 0 ? "\n" : "") + curr.rfc, "")}
						multiline={true}
						maxLines={nominaCtx.selected.length}
						minLines={nominaCtx.selected.length}
					/>
				</div>
				<div className={styles.container}>
					<EditableList2
						className={styles.element}
						label={"Calculado"}
						labelClassName={styles.label}
						lines={nominaCtx.selected.length}
						value={nominaCtx
							.getFilledNominas()
							.reduce((prev, curr, i) => prev + (i !== 0 ? "\n" : "") + curr.calcularSueldoAPagar(), "")}
						disabled={true}
					/>
					<EditableList2
						className={styles.element}
						label={"Real"}
						labelClassName={styles.label}
						lines={nominaCtx.selected.length}
						value={real}
						onSaveData={setReal}
					/>
					<div className={styles.element}>
						<Label className={styles.label}>Resultado</Label>
						<EditableText
							className={styles.editable}
							intent={result.includes("ERROR") ? Intent.DANGER : Intent.SUCCESS}
							maxLines={nominaCtx.selected.length}
							minLines={nominaCtx.selected.length}
							minWidth={0}
							multiline={true}
							placeholder={"Modificar"}
							selectAllOnFocus={true}
							value={result}
							disabled={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Verify;
