import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateActionValue } from '../redux/spritesSlice.js';
import { GO_TO, MOVE_STEPS, TURN_DEGREES,MOVE_IN_X,MOVE_IN_Y,TURN_CLOCKWISE,TURN_COUNTERCLOCKWISE } from '../constants/sidebarBlocks.js';

const InputAction = ({ action, index }) => {
    const dispatch = useDispatch();
    const parts = action.text.split('__');
    const selectedSpriteId = useSelector((state) => state.sprites.selectedSpriteId);
    const selectedSprite = useSelector((state) =>
        state.sprites.sprites.find(sprite => sprite.id === selectedSpriteId)
    );
    const spriteAction = selectedSprite.actions[index];
    const getInputCallbacks = () => {
        switch (action.type) {
            case MOVE_STEPS:
                return [(value) => dispatch(updateActionValue({ index, field: 'steps', value }))];
            case MOVE_IN_X:
                return [(value) => dispatch(updateActionValue({ index, field: 'x', value }))];
            case MOVE_IN_Y:
                return [(value) => dispatch(updateActionValue({ index, field: 'y', value }))];
            case TURN_DEGREES:
                return [(value) => dispatch(updateActionValue({ index, field: 'degree', value }))];
            case TURN_CLOCKWISE:
                return [(value) => dispatch(updateActionValue({ index, field: 'degree', value }))];
            case TURN_COUNTERCLOCKWISE:
                return [(value) => dispatch(updateActionValue({ index, field: 'degree', value }))];
            
            case GO_TO:
                return [
                    (value) => dispatch(updateActionValue({ index, field: 'x', value })),
                    (value) => dispatch(updateActionValue({ index, field: 'y', value }))
                ];
            default:
                return [];
        }
    };

    const inputCallbacks = getInputCallbacks();

    return (
        <div>{parts.map((part, partIndex) => (
            <React.Fragment key={partIndex}>
                {part}
                {partIndex < parts.length - 1 && inputCallbacks[partIndex] && (
                    <input
                        type="number"
                        className="w-16 mx-1 px-2 py-1 text-black rounded border border-blue-300"
                        value={
                            action.type === MOVE_STEPS ? spriteAction.payload.steps :
                                action.type === TURN_DEGREES ? spriteAction.payload.degree :
                                    action.type === GO_TO ? (partIndex === 0 ? spriteAction.payload.x : spriteAction.payload.y) :
                                        action.type === MOVE_IN_X ? spriteAction.payload.x :
                                            action.type === MOVE_IN_Y ? spriteAction.payload.y :
                                                action.type === TURN_CLOCKWISE ? spriteAction.payload.degree :
                                                    action.type === TURN_COUNTERCLOCKWISE ? spriteAction.payload.degree :
                                                    
                                        ''
                        }
                        onChange={(e) => inputCallbacks[partIndex](e.target.valueAsNumber)}
                    />
                )}
            </React.Fragment>
        ))}</div>
    );
};

export default InputAction;