import React from 'react';

export default function TestChildren({ children }) {
    return (
        <div>
            <h2>컴포넌트의 Children을 받아봅니다.</h2>
            <div className="alert alert-primary">{children}</div>
        </div>
    );
}
