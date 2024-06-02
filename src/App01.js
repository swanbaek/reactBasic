import React, { Component } from 'react'
import MyComp from './example/ex01'
//1. 클래스형으로 컴포넌트 구성해보기
class App extends Component{

    render(){

        return (
            <div className="container py-5">
            <h1>App01 컴포넌트(부모)</h1>
            <hr/>
            <MyComp mytxt="재미있는 React" mycolor="blue" mybgcolor='yellow'/>
            <MyComp mytxt="Excellent!!" mycolor="tomato" mybgcolor="green"></MyComp>
            <MyComp mytxt="잘가 React" mycolor="white" mybgcolor="purple"></MyComp>
            <MyComp/>
            {/* props를 전달하지 않을 경우 MyComp에서 설정한 defaultProps가 적용된다 */}
            </div>
        )
    }
}
export default App;