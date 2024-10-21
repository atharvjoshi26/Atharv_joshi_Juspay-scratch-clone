
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpriteCard from './CardSprite';
import allSprites from '../constants/sprites';
import { addCharacterSprite } from '../redux/spritesSlice';

export const AddSpriteCharacter = () => {
    const dispatch = useDispatch();
    const sprites = useSelector((state) => state.sprites.sprites);
    const [showModal, setShowModal] = useState(false);
    const [selectedSprite, setSelectedSprite] = useState({ id: null, name: null });

    const handleAddSprite = () => {
        if (selectedSprite.id) {
            const uniqueId = `${selectedSprite.id}-${Date.now()}`;
            dispatch(addCharacterSprite({ name: selectedSprite.name, id: uniqueId }));
            setShowModal(false);
            setSelectedSprite({ id: null, name: null });
        }
    };
    return (
        <>
            <button
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                onClick={() => setShowModal(true)}
            >
                Add Sprites
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">Choose a Sprite</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {allSprites.map((sprite, index) => (
                                <SpriteCard
                                    key={index}
                                    spriteName={sprite.name}
                                    selected={sprite.id === selectedSprite.id}
                                    onClick={() => setSelectedSprite({ id: sprite.id, name: sprite.name })}
                                    name="AddSprite"
                                />
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                                onClick={handleAddSprite}
                            >
                                Add Sprite
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
