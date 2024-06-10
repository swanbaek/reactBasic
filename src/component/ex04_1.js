import React, { useState } from 'react';

const Counter = () => {
    // useState 훅을 사용하여 count 상태와 setCount 함수를 선언
    const [count, setCount] = useState(0);

    // 버튼 클릭 시 count 상태를 업데이트하는 함수
    const incrementCount = () => {
        setCount(count + 1); // setCount를 호출하여 count를 1 증가
    };

    const decrementCount = () => {
        setCount(count - 1);
    };
    return (
        <div>
            <h2>카운터</h2>
            <p style={{ color: 'red', fontSize: '2em', fontWeight: 'bold' }}>현재 카운트: {count}</p>
            {/* 버튼 클릭 시 incrementCount 함수 호출 */}
            <button onClick={incrementCount} className="btn btn-success">
                증가
            </button>
            <button className="btn btn-warning" onClick={decrementCount}>
                감소
            </button>
        </div>
    );
};

export default Counter;
