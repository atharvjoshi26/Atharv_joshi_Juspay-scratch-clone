import React from "react";
import SpriteControls from "./SpriteControls";
import CanvasSprite from "./CanvasSprite";

export default function PreviewArea() {
  return (
    <div className="flex flex h-full w-full p-2">
      <CanvasSprite />
      <SpriteControls />
    </div>
  );
}
