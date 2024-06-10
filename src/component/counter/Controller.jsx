import React from 'react';

export default function Controller({ handleCount }) {
    return (
        <div className="Controller">
            <button
                onClick={() => {
                    handleCount(-1);
                }}
            >
                -1
            </button>
            <button
                onClick={() => {
                    handleCount(-10);
                }}
            >
                -10
            </button>
            <button onClick={() => handleCount(-100)}>-100</button>
            <button onClick={() => handleCount(100)}>+100</button>
            <button onClick={() => handleCount(10)}>+10</button>
            <button onClick={() => handleCount(1)}>+1</button>
        </div>
    );
}
