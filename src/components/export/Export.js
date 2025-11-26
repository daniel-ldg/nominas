import { Button, FormGroup, Intent, TextArea } from "@blueprintjs/core";
import { useContext } from "react";
import NominaContext from "../../store/NominaContext";

const Export = props => {
	const nominaContext = useContext(NominaContext);

	const handleDownload = () => {
		const csv = nominaContext.onGetCsv();

		// Create a Blob object
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

		// Create a temporary download link
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "nominas_output.csv"); // file name
		document.body.appendChild(link);
		link.click();

		// Cleanup
		link.parentNode.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<div style={{ display: props.hidden ? "none" : "block" }}>
			<FormGroup label="Archivo generado">
				<TextArea
					value={nominaContext.onGetCsv()}
					rows="10"
					growVertically={false}
					style={{ resize: "none", whiteSpace: "pre" }}
					fill
					readOnly
				/>
			</FormGroup>

			<Button fill intent={Intent.PRIMARY} onClick={handleDownload}>
				Descargar
			</Button>
		</div>
	);
};

export default Export;
