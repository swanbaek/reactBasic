import React, { useState, memo } from 'react';

const ChildComponent = memo(({ value }) => {
    console.log('Rendering ChildComponent');
    return <div>{value}</div>;
});

// const ChildComponent = ({ value }) => {
//     console.log('Rendering ChildComponent');
//     return (
//         <div className="alert alert-danger">
//             <h3>ChildComponent value: {value}</h3>
//         </div>
//     );
// };

const ParentComponent = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);

    return (
        <div style={{ padding: '5em', backgroundColor: 'yellow' }}>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <button onClick={() => setValue(value + 1)}>Increment Value</button>
            <p>Count: {count}</p>
            <ChildComponent value={value} />
        </div>
    );
};

export default ParentComponent;
