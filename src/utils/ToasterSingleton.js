import { Intent, Position, Toaster } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import styles from "./Toaster.module.css";

const buildToaster = (props, container = document.body) => {
	const containerElement = document.createElement("div");
	container.appendChild(containerElement);
	const root = createRoot(containerElement);
	return new Promise((resolve, reject) => {
		root.render(
			<Toaster
				{...props}
				usePortal={false}
				className={styles.toasterFixed}
				ref={ref => {
					if (!ref) {
						reject(new Error("[Blueprint] Unable to create toaster."));
					} else {
						resolve(ref);
					}
				}}
			/>
		);
	});
};

export const ToasterSingleton = (() => {
	let instance = null;

	const toasterProps = {
		canEscapeKeyClear: false,
		maxToasts: 1,
		position: Position.TOP,
	};

	const build = async () => (instance = await buildToaster(toasterProps));

	return {
		showUndo: (item, { message, icon, intent, undoText }, undoCallbak) => {
			const toast = {
				message: message || "Se guardaron los cambios",
				icon: icon || "notifications",
				intent: intent || Intent.NONE,
				action: {
					onClick: () => {
						undoCallbak(item);
					},
					text: undoText || "Deshacer",
					icon: "undo",
				},
			};

			if (instance) {
				instance.show(toast);
			} else {
				build().then(() => instance.show(toast));
			}
		},

		showLoad: ({ label }) => {
			const toast = {
				message: `Se cargó la lista de nóminas '${label}'`,
				icon: "folder-shared-open",
				intent: Intent.SUCCESS,
			};
			if (instance) {
				instance.show(toast);
			} else {
				build().then(() => instance.show(toast));
			}
		},

		clear: () => instance?.clear(),
	};
})();
