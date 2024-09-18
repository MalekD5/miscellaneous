import { useDroppable } from "@dnd-kit/core";

function Droppable(props: React.PropsWithChildren & { id: string }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };
  return (
    <div className="size-48 border" ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
export default Droppable;
