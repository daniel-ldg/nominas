import { Tab, Tabs } from "@blueprintjs/core";
import { useContext } from "react";
import NominaContext from "../../../store/NominaContext";

const MenuTabs = props => {
	const nominaContext = useContext(NominaContext);

	return (
		<Tabs selectedTabId={nominaContext.currentTab} onChange={nominaContext.onSetCurrentTab}>
			{nominaContext.getTabs().map(tab => (
				<Tab id={tab.id} disabled={!tab.active} key={tab.id}>
					{(props.isCompact ? tab?.shortName : tab.name) || tab.name}
				</Tab>
			))}
		</Tabs>
	);
};

export default MenuTabs;
