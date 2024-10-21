import { createSlice } from '@reduxjs/toolkit';
import allSprites, { SPRITE_HEIGHT, SPRITE_WIDTH } from '../constants/sprites'
const initialState = {
    sprites: [
        allSprites[0]
    ],
    selectedSpriteId: allSprites[0].id,
    showCollisionAnimation: true,
    collisionHandled: false,
};


const spritesSlice = createSlice({
    name: 'sprites',
    initialState,
    reducers: {
        addCharacterSprite: (state, action) => {
            state.sprites.push({
                id: action.payload.id,
                name: action.payload.name,
                position: { x: 0, y: 0 },
                rotation: 0,
                actions: [],
            });
            state.selectedSpriteId = action.payload.id
        },
        chooseSprite: (state, action) => {
            state.selectedSpriteId = action.payload;
        },
        addSpriteAction: (state, action) => {
            const { spriteId, actionType, actionText, payload } = action.payload;
            const sprite = state.sprites.find(sprite => sprite.id === spriteId);
            if (sprite) {
                sprite.actions.push({ type: actionType, text: actionText, payload });
            }
        },
        move: (state, action) => {
            const { steps, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.position.x += Math.cos((sprite.rotation * Math.PI) / 180) * steps;
                sprite.position.y -= Math.sin((sprite.rotation * Math.PI) / 180) * steps;
            }
        },
        moveInX: (state, action) => {
            const { x, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.position.x += x; // Move the sprite in the X direction
            }
        },
        moveInY: (state, action) => {
            const { y, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.position.y += y; // Move the sprite in the Y direction
            }
        },
        goTo: (state, action) => {
            const { x, y, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId)
            sprite.position.x = x;
            sprite.position.y = y;
        },
        rotate: (state, action) => {
            const { degree, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId)
            sprite.rotation += degree;
        },
        deleteSpriteAction: (state, action) => {
            const { index } = action.payload;
            const sprite = state.sprites.find((s) => s.id === state.selectedSpriteId)
            sprite.actions.splice(index, 1)
        },
  
        checkAndSwapCollision: (state, action) => { 
            const { spriteId1, spriteId2 } = action.payload;
        
            const spriteIndex1 = state.sprites.findIndex((s) => s.id === spriteId1);
            const spriteIndex2 = state.sprites.findIndex((s) => s.id === spriteId2);
        
            const sprite1 = state.sprites[spriteIndex1];
            const sprite2 = state.sprites[spriteIndex2];
        
            const identifyCollision = (sprite1, sprite2) => {
                const { x: x1, y: y1 } = sprite1.position;
                const { x: x2, y: y2 } = sprite2.position;
        
                const sprite1Bounds = {
                    left: x1,
                    right: x1 + SPRITE_WIDTH,
                    top: y1,
                    bottom: y1 + SPRITE_HEIGHT,
                };
        
                const sprite2Bounds = {
                    left: x2,
                    right: x2 + SPRITE_WIDTH,
                    top: y2,
                    bottom: y2 + SPRITE_HEIGHT,
                };
        
                const isColliding = !(sprite1Bounds.right < sprite2Bounds.left || 
                                      sprite1Bounds.left > sprite2Bounds.right || 
                                      sprite1Bounds.bottom < sprite2Bounds.top || 
                                      sprite1Bounds.top > sprite2Bounds.bottom);
        
                return isColliding; 
            };
        
            if (identifyCollision(sprite1, sprite2)) {

                if (!sprite1.hasSwapped && !sprite2.hasSwapped) {

                    state.sprites[spriteIndex1] = {
                        ...sprite1,
                        actions: sprite2.actions,
                        hasSwapped: true, 
                    };
        
                    state.sprites[spriteIndex2] = {
                        ...sprite2,
                        actions: sprite1.actions,
                        hasSwapped: true, 
                    };
        
                }
            } else {

                state.sprites[spriteIndex1].hasSwapped = false;
                state.sprites[spriteIndex2].hasSwapped = false;
            }
        },
        
        
        resetSpritePositions: (state) => {
            state.sprites.forEach(sprite => {
                sprite.position = { x: 0, y: 0 }; 
            });
        },
        resetCollisionHandled: (state) => {
            state.collisionHandled = false;
        },
        deleteSprite: (state, action) => {
            const { id } = action.payload;
            state.sprites = state.sprites.filter(sprite => sprite.id !== id); 
            if (state.selectedSpriteId === id) {
                state.selectedSpriteId = state.sprites.length > 0 ? state.sprites[0].id : null; 
            }
        },
        rotateClockwise: (state, action) => {  // New reducer for clockwise rotation
            const { degree, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.rotation += degree;  // Rotating clockwise
            }
        },
        rotateCounterClockwise: (state, action) => {  // New reducer for counterclockwise rotation
            const { degree, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.rotation -= degree;  // Rotating counterclockwise
            }
        },
        updateActionValue: (state, action) => {
            const sprite = state.sprites.find((s) => s.id === state.selectedSpriteId);
            const { index, field, value } = action.payload;
            sprite.actions[index]['payload'][field] = value
        }
    },
});

export const { addCharacterSprite,moveInX,moveInY, rotateClockwise,rotateCounterClockwise,chooseSprite, updateActionValue,  resetCollisionHandled, deleteSpriteAction, checkAndSwapCollision, goTo, move, rotate, updateRepeatPayload, addSpriteAction, playAllSprites,deleteSprite,resetSpritePositions } = spritesSlice.actions;

export default spritesSlice.reducer;
