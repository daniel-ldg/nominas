import { Button, Dialog, DialogBody, NonIdealState, Spinner } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import Timeline from "../ui/timeline/Timeline";

const url = "commits.json";

const VersionControlModal = ({ isOpen, onClose }) => {
	const [response, setResponse] = useState({});

	useEffect(() => {
		if (isOpen) {
			doRequest();
		} else {
			setResponse({});
		}
	}, [isOpen]);

	const doRequest = () => {
		setResponse({});
		fetch(url)
			.then(res => (res.ok ? res.json() : Promise.reject("Error en petición")))
			.then(
				data => setResponse({ data: data }),
				error => setResponse({ error: error })
			);
	};

	return (
		<Dialog
			isOpen={isOpen}
			onClose={onClose}
			icon="git-branch"
			title="Historial de actualizaciones"
			style={{ height: "300px", padding: "0" }}>
			<div style={{ overflow: "auto" }}>
				<DialogBody>
					{!response.data && !response.error && <Spinner />}
					{response.error && (
						<NonIdealState
							icon="error"
							title="Error"
							description="Ocurrió un error al intentar cargar los datos"
							action={<Button text="Reintentar" onClick={doRequest} />}
						/>
					)}
					{response.data && (
						<Timeline
							items={response.data.map(item => {
								let date = item.commit.committer.date;
								let [title, ...content] = item.commit.message.split("\n");
								return { date: date, title: title, content: content.join(" ") };
							})}
						/>
					)}
				</DialogBody>
			</div>
		</Dialog>
	);
};

export default VersionControlModal;
