import React, { useState, useEffect } from 'react';
const Clock = () => {
    const [date, setDate] = useState(new Date());
    const [timer, setTimer] = useState(new Date());

    useEffect(() => {
        console.log('mounted');
        const interval = setInterval(() => {
            setTimer(new Date());
        }, 1000);

        return () => {
            console.log('unmounted');
            clearInterval(interval);
        };
    }, []); // 빈 배열이므로 한 번만 실행 및 정리

    return (
        <div>
            <h1 className="text-primary">오늘 날짜: {date.toLocaleDateString()} </h1>
            <h1 className="text-danger">현재 시간: {timer.toLocaleTimeString()}</h1>
        </div>
    );
};

export default Clock;
