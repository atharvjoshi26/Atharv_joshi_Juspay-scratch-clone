
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseSprite, deleteSprite } from "../redux/spritesSlice"; 
import { AddSpriteCharacter } from "./AddSprites";
import SpriteCard from "./CardSprite";

const SpriteControls = () => {
  const spritesState = useSelector((state) => state.sprites);
  const sprites = spritesState.sprites;
  const selectedSpriteId = spritesState.selectedSpriteId;
  const dispatch = useDispatch();
 const name="spritcontrol";

  const handleDelete = (id) => {
    dispatch(deleteSprite({ id })); 
  };

  return (
    <div className="flex flex-col border-t-2 border-gray-200 bg-gray-100 p-2" style={{ flex: 0.2 }}>
    <div className="flex   flex-col justify-between items-center mb-2">
        <p className="font-bold text-lg">Sprites</p>
        <div className="flex flex-col items-center overflow-x-auto">
        <div className="flex gap-1">
            <AddSpriteCharacter />
        </div>            
            </div>

    </div>
      <div className="flex flex-col items-center overflow-x-auto">
      <div className="flex flex-col gap-1">
          {sprites.map((sprite) => (
            <SpriteCard
              key={sprite.id} 
              spriteName={sprite.name} 
              selected={sprite.id === selectedSpriteId}
              onClick={() => dispatch(chooseSprite(sprite.id))}
              onDelete={() => handleDelete(sprite.id)} 
              name={name} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpriteControls;
