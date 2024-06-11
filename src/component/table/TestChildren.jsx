import React from 'react';
/**
 * React 컴포넌트는 props 객체를 통해 데이터를 받고, 이 props 객체 안에 children이라는 키가 있습니다.
 * children은 해당 컴포넌트의 시작 태그와 끝 태그 사이에 위치한 모든 자식 요소를 나타냅니다.
-  children은 React 컴포넌트의 props 중 하나로, 해당 컴포넌트의 자식 요소들을 나타냅니다.
- children은 다른 props와 동일하게 컴포넌트에 전달됩니다.
- children을 사용하여 컴포넌트의 자식 요소들을 렌더링할 수 있습니다.
 */
export default function TestChildren({ children }) {
    return (
        <div>
            <h2>컴포넌트의 Children을 받아봅니다.</h2>
            <div className="alert alert-primary">{children}</div>
        </div>
    );
}
