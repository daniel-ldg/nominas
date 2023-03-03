import { Dialog } from "@blueprintjs/core";

const VersionControlModal = props => {
	return (
		<Dialog
			isOpen={props.isOpen}
			onClose={props.onClose}
			icon='git-branch'
			title='Historial de actualizaciones'></Dialog>
	);
};

export default VersionControlModal;
