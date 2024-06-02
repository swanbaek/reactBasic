import React,{Component} from 'react'

class LifeCycle extends Component{
//1. 초기에 컴포넌트가 생성되고 화면에 렌더링될 때, constructor -> render -> componentDidMount 순서로 메서드가 호출
//2. 토글 버튼으로 컴포넌트 제거: 컴포넌트가 언마운트되고 새로운 렌더링이 발생합니다. 이 때 먼저 componentWillUnmount가 호출되어 컴포넌트가 제거되기 전에 필요한 정리 작업을 수행
//3. 토글 버튼으로 컴포넌트 다시 등장: 다시 토글 버튼을 클릭하여 컴포넌트를 화면에 나타내는 경우, 
// React는 해당 컴포넌트를 새로운 렌더링 과정에 포함시킵니다. 그리고 이때 constructor -> render -> componentDidMount 순서로 메서드가 호출
//index.js에서 StrictMode를 주석처리하고 해보자. 안그러면 로그가 두번씩 출력되서 헷갈림
    state={
        color:'red'
    }
    constructor(props){
        super(props);
        console.log('LifeCycle생성자 호출됨22 data: ')
        console.dir(this.props)
    }
    componentDidMount() {
        console.log('componentDidMount 호출됨');
    }
    //컴포넌트가 언마운트 되기 직전에 호출된다. 언마운트=>(컴포넌트 숨김/라우팅 변경/조건부 렌더링/부모 컴포넌트 변경)
    componentWillUnmount() {
        console.log('componentWillUnmount 호출됨');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
        // 새로운 props나 state와 현재 props나 state를 비교하여 업데이트 여부를 결정합니다.
        // true를 반환하면 컴포넌트가 업데이트됩니다.
        // false를 반환하면 컴포넌트가 업데이트되지 않습니다.
        return true; // 예시: 항상 업데이트
      }
    render(){
        console.log('render()호출됨') 
        return (
            <div className="jumbotron py-4 my-5"
             onMouseOver={()=>{this.setState({color:'green'})}} 
             onMouseOut={()=>{this.setState({color:'red'})}}>
                <h1 style={{color:this.state.color}}>컴포넌트 LifeCycle</h1>
            </div>
        )
    }
}

export default LifeCycle;