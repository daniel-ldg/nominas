import { FocusStyleManager } from "@blueprintjs/core";
import Header from "./components/header/Header";
import MainExpander from "./components/main/MainExpander";
import Spacer from "./components/ui/Spacer";
import { LocalStorageContextProvider } from "./store/LocalStorageContext";
import NominaContextProvider from "./store/NominaContextProvider";

const App = () => {
	FocusStyleManager.onlyShowFocusOnTabs();

	return (
		<NominaContextProvider>
			<LocalStorageContextProvider>
				<Header />
				<Spacer height='20' />
				<MainExpander />
			</LocalStorageContextProvider>
		</NominaContextProvider>
	);
};

export default App;
