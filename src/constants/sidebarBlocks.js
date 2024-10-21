
import React from 'react';

export const motionColor = {
    bgColor: "bg-red-500",
    textColor: "text-white",
    border: "border border-red-500 rounded-md", 
};


export const controlColor = {
    bgColor: "bg-blue-500",
    textColor: "text-white"
};

export const MOVE_STEPS = "MoveSteps";
export const MOVE_IN_X = "MoveInX";           // New constant for moving in X direction
export const MOVE_IN_Y = "MoveInY";           // New constant for moving in Y direction
export const TURN_DEGREES = "TurnDegrees";
export const TURN_CLOCKWISE = "TurnClockwise";  // New constant for clockwise rotation
export const TURN_COUNTERCLOCKWISE = "TurnCounterClockwise";  // New constant for counter-clockwise rotation
export const GO_TO = "GoTo";
export const REPEAT = "Repeat";

export default {
    Motion: [
        {
            text: 'Move __ steps',
            type: MOVE_STEPS,
            defaultPayload: { steps: 5 }
        },
        {
            text: 'Move X: __',
            type: MOVE_IN_X,                // Action for moving in X direction
            defaultPayload: { x: 10 }       // Default value for X movement
        },
        {
            text: 'Move Y: __',
            type: MOVE_IN_Y,                // Action for moving in Y direction
            defaultPayload: { y: 10 }       // Default value for Y movement
        },
        {
            text: 'Turn __ degrees',
            type: TURN_DEGREES,
            defaultPayload: { degree: 45 }
        },
        {
            text: 'Turn clockwise __ degrees',
            type: TURN_CLOCKWISE,            // Action for turning clockwise
            defaultPayload: { degree: 90 }   // Default value for clockwise rotation
        },
        {
            text: 'Turn counter-clockwise __ degrees',
            type: TURN_COUNTERCLOCKWISE,     // Action for turning counter-clockwise
            defaultPayload: { degree: 90 }   // Default value for counter-clockwise rotation
        },
        {
            text: "Go To x:__ y:__",
            type: GO_TO,
            defaultPayload: { x: 100, y: 100 }
        },
    ],
    Control: [
        {
            type: REPEAT,
            text: "Repeat Animation",
            defaultPayload: {}
        },
    ],
};
