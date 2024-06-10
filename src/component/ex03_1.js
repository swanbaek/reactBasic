import React, { Component } from 'react';
//클래스형 컴포넌트 (사용하지 않을 예정. 복잡함 참고만 하자)
export default class HisComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            name: 'Hong',
        };
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick = () => {
        this.setState({ isLogin: !this.state.isLogin });
    };

    render() {
        return (
            <>
                <button onClick={this.onButtonClick}>Toggle</button>
                {/* jsx안에서는 제어문을 사용할 수 없다. */}
                {/* if(this.state.isLogin){<h3>{this.state.name}님 로그인 중</h3>}else{<h3>로그인</h3>} */}
                {this.state.isLogin ? <h3>{this.state.name}님 로그인 중</h3> : <h3>로그인 하세요</h3>}
                <hr />
                {this.state.isLogin && <h3>♥{this.state.name}님 로그인 중 ♥</h3>}
                {!this.state.isLogin && <h3>♥로그인 하세요♥</h3>}
                <br />
            </>
        );
    }
}
