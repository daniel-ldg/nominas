import { ControlGroup, FileInput, FormGroup } from "@blueprintjs/core";
import { useEffect, useRef, useState } from "react";

const LoadFile = ({ onImport }) => {
	const [fileLoaded, setFileLoaded] = useState(null);
	const fileInputRef = useRef();

	const fileChangeHandler = event => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = e => {
			let csv = e.target.result;
			setFileLoaded(file.name);
			onImport({ data: csv, label: file.name });
		};
		reader.readAsText(file, "ISO-8859-1");
		fileInputRef.current.value = "";
	};

	useEffect(() => {
		if (fileLoaded) {
			const interval = setInterval(() => {
				setFileLoaded(null);
			}, 5000);
			return () => {
				clearInterval(interval);
			};
		}
	}, [fileLoaded]);

	return (
		<FormGroup label='Archivo'>
			<ControlGroup>
				<FileInput
					fill={true}
					text={fileLoaded ? `Se cargó el archivo '${fileLoaded}'...` : "Elegir archivo"}
					buttonText='Buscar'
					onInputChange={fileChangeHandler}
					inputProps={{ accept: "text/csv", ref: fileInputRef }}
					hasSelection={fileLoaded}
					disabled={fileLoaded}
				/>
			</ControlGroup>
		</FormGroup>
	);
};

export default LoadFile;
