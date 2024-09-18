"use client";
import Board from "@/components/Board";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { Game } from "@/lib/game";
import {
  DndContext,
  type UniqueIdentifier,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./_components/Draggable";
import Droppable from "./_components/Droppable";

export default function Home() {
  // const game = useGame();
  // const [initialized, setInitialized] = useState<boolean>(false);

  // const handleNewGame = (pov: "white" | "black") => {
  //   game.init(pov);
  //   setInitialized(true);
  // };
  // return (
  //   <>
  //     {/* {initialized ? (
  //       <Board game={game} />
  //     ) : (
  //       <>
  //         <Button onClick={() => handleNewGame("white")}>play as white</Button>
  //         <Button onClick={() => handleNewGame("black")}>play as black</Button>
  //       </>
  //     )} */}
  //   </>
  // );

  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup : "Drop here"}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}
