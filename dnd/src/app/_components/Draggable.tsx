import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Draggable(props: React.PropsWithChildren & { id: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;
  return (
    <button
      className="bg-red-700 p-4 rounded-lg"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
export default Draggable;
