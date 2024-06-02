import React, { useState, useEffect } from 'react';

export default function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 비슷. 
  //카운트 값이 변경되면 실행되고 컴포넌트가 다시 렌더링 된다. 렌더링이 끝나면 호출된다.
  //[]빈 배열을 전달하면 첫 번째 렌더링 후에만 useEffect콜백함수가 실행된다.
  useEffect(() => {
    console.log('useEffect훅 : Component Mounted',count);
    // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
    document.title = `You clicked ${count} times`;
   
    return ()=>{
        //unmount될때 해야 할 작업들이 있다면 여기서 하면 된다.
        console.log('Clean Up: effect를 해제할 필요가 있다면 해제하는 함수를 반환하면 된다.');
        
    }
  },[]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)} className="btn btn-outline-danger">
        Click Me
      </button>
    </div>
  );
}