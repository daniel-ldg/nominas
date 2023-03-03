import { Button, Menu, MenuItem } from "@blueprintjs/core";
import { Select2 } from "@blueprintjs/select";

const CustomSelect2 = ({ items, selected, onSelect, selectProps, placeholder = "Seleccionar" }) => {
	const itemPredicate = (query, item) => {
		const normalizedSubtext = item?.subtext?.toLowerCase()?.concat(" ") || "";
		const normalizedItem = normalizedSubtext + item?.text?.toLowerCase() || "";
		const normalizedQuery = query.toLowerCase();

		return normalizedItem.indexOf(normalizedQuery) >= 0;
	};

	const itemRenderer = (item, { handleClick, handleFocus, modifiers }) => {
		if (!modifiers.matchesPredicate) {
			return null;
		}
		return (
			<MenuItem
				active={modifiers.active}
				disabled={item.disabled}
				key={item.key}
				onClick={handleClick}
				onFocus={handleFocus}
				roleStructure='listoption'
				text={item.text}
				label={<span style={{ fontFamily: "monospace, monospace" }}>{item.subtext}</span>}
			/>
		);
	};

	const menuRenderer = ({ items, itemsParentRef, query, renderItem, menuProps }) => {
		const renderedItems = items.map(renderItem).filter(item => item != null);
		return (
			<Menu style={{ maxHeight: "120px", overflow: "auto" }} role='listbox' ulRef={itemsParentRef} {...menuProps}>
				{renderedItems}
				{renderedItems.length === 0 && (
					<MenuItem roleStructure='listoption' disabled={true} icon='warning-sign' text='Sin resultados' />
				)}
			</Menu>
		);
	};

	return (
		<Select2
			items={items.map((item, i) => ({ ...item, key: i }))}
			itemPredicate={itemPredicate}
			itemRenderer={itemRenderer}
			itemListRenderer={menuRenderer}
			onItemSelect={onSelect}
			popoverProps={{ matchTargetWidth: true }}
			inputProps={{ placeholder: "Buscar" }}
			itemsEqual='key'
			activeItem={selected}
			{...selectProps}>
			<Button
				text={(selected?.subtext?.concat(" ") || "") + (selected?.text || "") || placeholder}
				icon={!selected ? "properties" : "property"}
				fill={true}
			/>
		</Select2>
	);
};

export default CustomSelect2;
