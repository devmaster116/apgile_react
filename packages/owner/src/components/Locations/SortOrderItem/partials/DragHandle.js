import React from "react";
import { DragIconWrapper } from "../styles";
import { ReactComponent as DragHandleIcon } from "../drag_handle-black-18dp.svg";

export function DragHandle(props) {
  return (
    <DragIconWrapper {...props}>
      <DragHandleIcon />
    </DragIconWrapper>
  );
}
