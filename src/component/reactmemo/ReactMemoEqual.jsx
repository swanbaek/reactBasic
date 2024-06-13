import React from 'react';

const MyComponent = (props) => {
    console.log('Rendering MyComponent');
    return <div>{props.value}</div>;
};

const areEqual = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
};

export default React.memo(MyComponent, areEqual);
/**이 예제에서 areEqual 함수는 이전 props와 새로운 props를 비교하여 props가 변경되지 않았는지 확인합니다.
 *  만약 areEqual 함수가 true를 반환하면, MyComponent는 다시 렌더링되지 않습니다. */
