import { Button, Dialog, DialogBody, NonIdealState, Spinner } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import Timeline from "../ui/timeline/Timeline";

const token = atob(
	"Z2l0aHViX3BhdF8xMUFFQU1TMlEwTkU5a1BhOFpKVGRJX0Z3Ymh4enNFdndaUVVaaDYxWDdveWE0UjdZemtZNkxiN2RmV2JJdjc5SzZJR1pUNDIzTFpaWU5wZVVl"
);
const url = "https://api.github.com/repos/daniel-ldg/nominas/commits";

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
		fetch(url, {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${token}`,
			},
		})
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
			icon='git-branch'
			title='Historial de actualizaciones'
			style={{ height: "300px", padding: "0" }}>
			<div style={{ overflow: "auto" }}>
				<DialogBody>
					{!response.data && !response.error && <Spinner />}
					{response.error && (
						<NonIdealState
							icon='error'
							title='Error'
							description='Ocurrió un error al intentar cargar los datos'
							action={<Button text='Reintentar' onClick={doRequest} />}
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
