// 1. 클래스형 컴포넌트 구성하기
import React from 'react';

class MyComp extends React.Component{
    //주석
    // jsx : 자바스크립트 확장문법
    // JavaScript and XML
    // 코드 간결, 가독성 좋음
    static defaultProps={
        mycolor: "gray",
        mybgcolor:"#efefef",
        mytxt:"Hello React~",
    }

    render(){
        // 
        let mystyle={
            color:this.props.mycolor,
            backgroundColor:this.props.mybgcolor,
            padding:'1em',
            margin:'1em'
        }

        const {mytxt} =this.props;//구조분해 할당
        /*this.props 객체로부터 mytxt 프로퍼티를 추출하여 
        새로운 mytxt 변수에 할당하는 것을 의미. 
        이후에는 mytxt 변수를 통해 해당 프로퍼티 값을 직접 사용할 수 있다. 
        이렇게 하지 않는다면 {this.props.mytxt}식으로 작성해야 함*/ 
        return (            
            // root element는 1개. empty fragment를 주어도 됨(16.2버전부터 사용)
            <> 
                <h2 style={mystyle}>자식 컴포넌트 MyComp [MyTxt: {mytxt}] </h2>
                {/* 이 안은 jsx영역 */}
            </>
        )
    }

}
export default MyComp