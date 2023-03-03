import React, { useEffect, useReducer } from "react";
import { v4 } from "uuid";

export const LocalStorageContext = React.createContext({
	imports: [],
	addImport: data => {},
	removeSavedImport: id => {},
	onSetImportFavorite: (isFavorite, id) => {},
	renameImport: (label, id) => {},
});

const sortFavoriteLastUsed = (a, b) => {
	const aBeforeB = -1;
	const bBeforeA = 1;
	if (a.isFavorite && !b.isFavorite) {
		return aBeforeB;
	} else if (!a.isFavorite && b.isFavorite) {
		return bBeforeA;
	} else {
		return a.lastUsed > b.lastUsed ? aBeforeB : bBeforeA;
	}
};

const MAX_SAVED_IMPORTS = 10;
const IMPORTS_KEY = "recent_imports";
const saveImports = data => localStorage.setItem(IMPORTS_KEY, JSON.stringify(data));
const getImports = () => JSON.parse(localStorage.getItem(IMPORTS_KEY)) || [];

const IMPORTS_ACTIONS = {
	ADD_IMPORT: 1,
	REMOVE_IMPORT: 2,
	SET_IMPORT_FAVORITE: 3,
	REMOVE_IMPORT_FAVORITE: 4,
	RENAME_IMPORT: 5,
};

const importsReducer = (prevState, action) => {
	var newState = [...prevState];
	switch (action.type) {
		case IMPORTS_ACTIONS.ADD_IMPORT:
			const timestamp = Date.now();
			const foundImport = newState.find(importItem => importItem.data === action.data);
			if (foundImport) {
				foundImport.lastUsed = timestamp;
			} else {
				const newImport = {
					id: v4(),
					timestamp: timestamp,
					lastUsed: timestamp,
					data: action.data,
					isFavorite: false,
					label: `Lista de nóminas sin nombre (${newState.length + 1})`,
				};
				if (prevState.length < MAX_SAVED_IMPORTS) {
					newState.push(newImport);
				} else {
					if (newState.some(item => !item.isFavorite)) {
						newState.pop();
						newState.push(newImport);
					} // else : can not store (all places taken by favorites)
				}
			}
			newState.sort(sortFavoriteLastUsed);
			return newState;

		case IMPORTS_ACTIONS.REMOVE_IMPORT:
			newState = newState.filter(item => item.id !== action.id);
			return newState;

		case IMPORTS_ACTIONS.SET_IMPORT_FAVORITE:
			newState = newState
				.map(item => (item.id !== action.id ? item : { ...item, isFavorite: action.isFavorite }))
				.sort(sortFavoriteLastUsed);
			return newState;

		case IMPORTS_ACTIONS.RENAME_IMPORT:
			newState = newState.map(item => (item.id !== action.id ? item : { ...item, label: action.label }));
			return newState;

		default:
			break;
	}
};

export const LocalStorageContextProvider = ({ children }) => {
	const [imports, importsDispatch] = useReducer(importsReducer, null, getImports);

	useEffect(() => saveImports(imports), [imports]);

	return (
		<LocalStorageContext.Provider
			value={{
				imports: imports,
				addImport: data => importsDispatch({ type: IMPORTS_ACTIONS.ADD_IMPORT, data: data }),
				removeSavedImport: id => importsDispatch({ type: IMPORTS_ACTIONS.REMOVE_IMPORT, id: id }),
				onSetImportFavorite: (isFavorite, id) =>
					importsDispatch({ type: IMPORTS_ACTIONS.SET_IMPORT_FAVORITE, id: id, isFavorite: isFavorite }),
				renameImport: (label, id) => importsDispatch({ type: IMPORTS_ACTIONS.RENAME_IMPORT, label: label, id: id }),
			}}>
			{children}
		</LocalStorageContext.Provider>
	);
};
