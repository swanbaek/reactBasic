import React, { useState } from 'react';
import './Counter.css';
import Viewer from './Viewer';
import Controller from './Controller';
export default function App() {
    const [count, setCount] = useState(20);
    const handleCount = (val) => {
        setCount(count + val);
    };
    return (
        <div className="App">
            <h1>Simple Counter</h1>
            <Viewer count={count} />
            <Controller handleCount={handleCount} />
        </div>
    );
}
