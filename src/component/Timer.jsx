import React, { useState, useEffect } from 'react';
 const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('mounted')
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      console.log('unmounted')
      clearInterval(interval);
    };
  }, []); // 빈 배열이므로 한 번만 실행 및 정리 

  return <div><h1 className="text-danger">Seconds: {seconds}</h1></div>;
};

export default TimerComponent;