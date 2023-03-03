import { Button, Classes, Icon, Intent } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { timeDifference } from "../../../utils/TimeUtils";
import styles from "./Recent.module.css";

const RecentDialogFooter = ({ lastUsed, id, onImport }) => {
	const [relativeLastUsed, setRelativeLastUsed] = useState();

	const updateRelativeLastUsed = () => setRelativeLastUsed(timeDifference(Date.now(), lastUsed));

	useEffect(() => {
		if (!lastUsed) {
			return;
		}
		updateRelativeLastUsed();
		const interval = setInterval(updateRelativeLastUsed, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [lastUsed]);

	return (
		<div className={`${Classes.MULTISTEP_DIALOG_FOOTER} ${Classes.DIALOG_FOOTER_FIXED} ${styles.footer}`}>
			<div className={`${Classes.DIALOG_FOOTER_MAIN_SECTION} ${styles.footerSection}`}>
				{lastUsed && (
					<span className={Classes.TEXT_MUTED}>
						<Icon icon='small-info-sign' /> Último uso hace {relativeLastUsed}
					</span>
				)}
			</div>
			<div className={Classes.DIALOG_FOOTER_ACTIONS}>
				<Button disabled={!id} text='Cargar' intent={Intent.PRIMARY} onClick={onImport} />
			</div>
		</div>
	);
};

export default RecentDialogFooter;
