import { useState } from "react";
import LifeCycle from './LifeCycle'
const MyComp2 = () => {

    // state : 일반 자바 객체로 component에서 변할 수 있는 값

    // lifecycle(생명주기)

    // 마운트 : 컴포넌트가 생성되고 브라우저에 출력될 때
    // constructor : 컴포넌트가 새로 만들어 질 때마다 호출 되는 클래스 생성자 메소드
    // render : 랜더링 메소드
    // componentDidMount : 처음 랜더링 될 때 호출

    // 업데이트 : props나 state가 바뀔 때 부모컴포넌트가 재랜더링 될때
    // shouldComponentUpdate : props나 state가 변경됐을 때 재랜더링을 할지 결정하는 메소드
    // render : 재랜더링 
    // componentDidUpdate : 컴포넌트의 업데이트 작업이 끝난 후 호출 

    // 언마운트 : 마운트의 반대, 컴포넌트가 제거 될 때
    // componentWillUnmount : 컴포넌트가 브라우저에서 사라지기 전에 호출하는 메소드

    // hooks : 함수형 컴포넌트에서 리액트의 state와
    // 생명주기 기능을 연동(hook) 할 수 있게 해주는 함수

    // useState()
    // const [ 변수명, 함수명 ] = useState(초기값);
    const [show , setShow] = useState(true);
    
    const toggleComponent = () => {
        let flag=show;
        setShow(!flag)    
    }

    
    
    return (
        <div className='comp2 comp'>
            <h1>MyComp2 - LifeCycle</h1>

            <p style={{background:'blue', color:"white", padding:8}}>토클 버튼을 클릭해보세요. LifeCycle컴포넌트가 mount/unmount됩니다. show: {show} </p>
            <button onClick={toggleComponent} className="btn btn-success">컴포넌트 토글 {show} </button>
            
            {show&&<LifeCycle  data={show} />} 
        </div>
    );
};

export default MyComp2;

/**생명주기 메서드가 두 번 호출되는 이유는 컴포넌트가 두 번 렌더링되기 때문입니다. 이는 React 애플리케이션에서 주로 발생하는 일반적인 문제 중 하나입니다. 
 * 주로 다음과 같은 이유로 발생할 수 있습니다:
컴포넌트 상태(State) 또는 속성(Props)의 변경: 컴포넌트의 상태나 속성이 변경되면 React는 이를 감지하고 다시 렌더링합니다. 만약 상태나 속성이 변경되면 render() 메서드가 호출되고, 
이후에는 componentDidMount가 다시 호출될 수 있습니다.
부모 컴포넌트의 렌더링: 부모 컴포넌트가 렌더링될 때, 자식 컴포넌트들도 함께 렌더링됩니다. 이 때 자식 컴포넌트의 componentDidMount가 호출되고, 이후에는 부모 컴포넌트의 상태나 속성 변경에 의해 자식 컴포넌트가 다시 렌더링되면 componentWillUnmount와 componentDidMount가 다시 호출될 수 있습니다.
컴포넌트의 초기 렌더링: 초기 렌더링 과정에서 컴포넌트가 두 번 렌더링될 수 있습니다. 이 때 첫 번째 렌더링은 가상 DOM(Virtual DOM)에 대한 초기 렌더링이며, 두 번째 렌더링은 실제 DOM에 대한 업데이트가 발생할 때입니다. 이런 경우에도 componentDidMount가 두 번 호출될 수 있습니다. */