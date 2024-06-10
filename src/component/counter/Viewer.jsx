import React from 'react';

export default function Viewer({ count }) {
    return (
        <div className="View">
            <h2>현재 카운트</h2>
            <div className="count">{count}</div>
        </div>
    );
}
