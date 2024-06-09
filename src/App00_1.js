import React from 'react';
// import Comp from './example/JsxEx7Style'
// test
import Comp1 from './example/JsxEx1';
import * as Comp2 from './example/JsxEx2';
import { GetBrand, GetOS } from './example/JsxEx3';
export default function App() {
    return (
        <div>
            <Comp1 />
            <Comp2.JsxEx2 />
            <Comp2.MyComponent />
            <Comp3 />
        </div>
    );
}
