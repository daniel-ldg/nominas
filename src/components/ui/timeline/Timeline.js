import { timeDifference } from "../../../utils/TimeUtils";
import styles from "./Timeline.module.css";

export const Timeline = ({ items }) => {
	return (
		<ul className={styles.timeline}>
			{items.map((item, i) => (
				<li key={i} className={styles.item}>
					<p className={styles.date} title={new Date(item.date).toLocaleDateString("es-MX")}>{`Hace ${timeDifference(
						new Date(item.date)
					)}`}</p>
					<div className={styles.content}>
						<h3>{item.title}</h3>
						<p>{item.content}</p>
					</div>
				</li>
			))}
		</ul>
	);
};

export default Timeline;
