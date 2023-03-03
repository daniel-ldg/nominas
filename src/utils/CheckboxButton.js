import { Button } from "@blueprintjs/core";

const CheckboxButton = ({ checked, onChange, className }) => {
	return <Button className={className} icon={checked ? "selection" : "circle"} onClick={() => onChange(!checked)} />;
};

export default CheckboxButton;
