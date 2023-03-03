import { FormGroup, TextArea } from "@blueprintjs/core";
import { useContext, useEffect, useState } from "react";
import NominaContext from "../../store/NominaContext";

const Export = props => {
	const nominaContext = useContext(NominaContext);

	return (
		<div style={{ display: props.hidden ? "none" : "block" }}>
			<FormGroup label='Archivo generado'>
				<TextArea
					value={nominaContext.onGetCsv()}
					rows='10'
					growVertically={false}
					style={{ resize: "none", whiteSpace: "pre" }}
					fill
					readOnly
				/>
			</FormGroup>
		</div>
	);
};

export default Export;
