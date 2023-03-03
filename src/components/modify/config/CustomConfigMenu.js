import { Menu, MenuDivider } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";

const CustomConfigMenu = props => {
	const savedConfigs = [];

	return (
		<Menu>
			<MenuDivider title='Configuración actual' />
			<MenuItem2 icon='cog' text='Modificar' />
			<MenuItem2 icon='floppy-disk' text='Guardar como...' />
			<MenuDivider title='Configuraciones guardadas' />
			{savedConfigs.length === 0 && <MenuItem2 text='No hay guardadas' disabled={true} />}
		</Menu>
	);
};

export default CustomConfigMenu;
