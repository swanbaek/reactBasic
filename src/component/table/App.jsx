import React from 'react';
import TestChildren from './TestChildren';
export default function App() {
    return (
        <div>
            <h1>부모 App</h1>
            <hr />
            <TestChildren>
                <h3>반가워</h3>
            </TestChildren>
            <TestChildren>
                <h1>눈이 부시게 푸르른 날은</h1>
                <img src="images/error.png" />
            </TestChildren>
        </div>
    );
}
