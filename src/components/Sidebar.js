import React from "react";
import sidebarBlocks, { controlColor, motionColor } from "../constants/sidebarBlocks";

export default function Sidebar() {
  const handleDragAction = (e, actionType, payload, text) => {
    e.dataTransfer.setData('actionType', actionType);
    e.dataTransfer.setData('text', text);
    e.dataTransfer.setData('payload', JSON.stringify(payload));
  };
  return (
    <div className="bg-gray-200 w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {
        Object.keys(sidebarBlocks).map(key => {
          return (
            <div key={key}>
              <div className="font-bold">{key}</div>
              <div>
                {sidebarBlocks[key].map((block, index) => {
                  let bgColor = ""
                  let textColor = ""
                  let border = ""
                  switch (key) {
                    case "Motion":
                      bgColor = motionColor.bgColor
                      textColor = motionColor.textColor
                      border = motionColor.border; 
                      break
                    case "Control":
                      bgColor = controlColor.bgColor
                      textColor = controlColor.textColor
                      break
                    default:
                      break
                  }
                  return <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragAction(e, block.type, block.defaultPayload, block.text)}
                    className={`flex flex-row ${bgColor} ${textColor} ${border} px-2 py-1 my-2 text-sm cursor-pointer`}
                    >
                    {block.text}
                  </div>
                })}
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
