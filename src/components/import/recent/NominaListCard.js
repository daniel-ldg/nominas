import { Classes, Icon, Intent } from "@blueprintjs/core";
import styles from "./Recent.module.css";

const NominaListCard = ({ label, isFavorite, isActive, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={`${Classes.DIALOG_STEP_CONTAINER} ${Classes.DIALOG_STEP_VIEWED} ${isActive ? Classes.ACTIVE : ""}`}>
			{isFavorite && <Icon icon='bookmark' intent={Intent.PRIMARY} className={styles.favoriteIcon} />}
			<div className={`${Classes.DIALOG_STEP}`}>
				<div className={Classes.DIALOG_STEP_ICON}>
					<Icon icon={isActive ? "folder-open" : "folder-close"} />
				</div>
				<div className={`${Classes.DIALOG_STEP_TITLE} ${styles.label}`}>{label}</div>
			</div>
		</div>
	);
};

export default NominaListCard;
