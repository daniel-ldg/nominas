import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import FlexContainer from "../FlexContainer";

const DraggableFlexContainer = ({ onChange, children }) => {
	const [generatedUUID] = useState(v4());

	const onDragEnd = ({ source, destination, draggableId }) => {
		if (!destination) {
			return;
		}
		if (source.index === destination.index) {
			return;
		}
		onChange({ source: source.index, destination: destination.index });
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={generatedUUID}>
				{provided => (
					<FlexContainer innerRef={provided.innerRef} {...provided.droppableProps}>
						{children}
						{provided.placeholder}
					</FlexContainer>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default DraggableFlexContainer;
