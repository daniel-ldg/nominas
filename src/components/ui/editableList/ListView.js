import ListItem from "./ListItem";

const ListView = props => {
	const items = props.data.split("\n");

	return (
		<pre>
			{items.map((item, i) => (
				<ListItem value={item} key={`id_${i}`} isValid={props.isValid ? props.isValid(item) : undefined} />
			))}
		</pre>
	);
};

export default ListView;
