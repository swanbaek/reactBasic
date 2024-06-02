import React, { useState } from 'react';
import { Button, Badge, Stack,  } from 'react-bootstrap';
/* 이벤트 사용시 주의 사항
1. 이벤트 이름은 camel표기법으로 작성한다.
    ex)html=> onclick
       React=> onClick
2. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라,
   함수형태의 값을 전달한다.
3. DOM요소에만 이벤트를 설정할 수 있다.
    button, input, div,... => 이벤트 설정 가능
    MyComp =>우리가 직접 만든 컴포넌트에는 자체적으로 이벤트 설정을 할 수 없다.
            => 만약 MyComp에 onClick을 설정한다면 이것은 이벤트가 아니라 props를
            MyComp에게 전달하는 것이다. (이것을 이해하자 꼭!)
*/
export default function MyEventComp() {

  const [clickCount, setClickCount] =useState(0);
  const [clickCount2, setClickCount2] =useState(0);

  const [hovered, setHovered]=useState(false);
  const [param, setParam]=useState('Hello');
  const [color, setColor]=useState('maroon'); 


  const handleClick=()=>{
    //  alert('hi')
    setClickCount(clickCount+1)
  }

  const handleClick2=(val)=>{
    //alert('hi '+val)
    setClickCount2(clickCount2+val)
 }

 const handleMouseOver=()=>{
    setHovered(true)
 }
 const handleMouseOut=()=>{
    setHovered(false)
 }

 const handleChange=(e)=>{
    
    // console.log(e.target.name);
    // console.log(e.target.value);

    const {name,value}=e.target;//구조화 할당
    console.log(`name:${name}, value: ${value}`)
    setParam(value)
 }
  return (
    <Stack gap={3} className="col-md-8 mx-auto py-5">
      
      <Button variant='outline-success' onClick={handleClick}>Click Me1 {clickCount} </Button>
      {/* <Button variant='outline-warning' onClick={handleClick2(10)}>Click Me2</Button> 
      이런식으로 onClick={handleClick2(10)} 식으로 하면 안된다.
      인수를 전달해야할 때는 화살표 함수를 이용해야 한다. 아래 처럼
      */}
      <Button variant='outline-warning' onClick={()=>{handleClick2(10)}}>Click Me2 {clickCount2}</Button> 
      {/* 에러가 발생하는 이유는 handleClick2(10)을 직접 호출하면 
      반환값이 onClick 핸들러로 설정되기 때문. 이를 피하려면 화살표 함수를 사용하여 
      이벤트가 발생할 때 함수 호출이 이루어지도록 해야 한다. 아까 코드처럼 해버리면 handleClick2(10)의 반환값이 onClick에 전달된다.
      이벤트 핸들러로 동작하게 하려면 함수 호출이 아닌 함수 정의가 전달돼야 한다.. */}      
      <div
        style={{
          width: '100%',
          padding:'1em',
          height: 170,
          backgroundColor: hovered ? 'lightblue' : 'lightgray',
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <p style={{fontSize:'2em',fontWeight:'bold'}}>
            clickCount:  <Badge bg="primary">{clickCount}</Badge>
            <br></br>
            clickCount2:  <Badge bg="danger">{clickCount2}</Badge>
        </p>
       
      
      </div>
      <br/>
       <input type="text" name="param" onChange={handleChange}/>
     <br/> 

      <p style={{background:color, color:"white"}}>{param}</p>
      <p>
        <Button variant='secondary' onClick={()=>{setColor('red')}}>Red</Button>
        <Button  variant={hovered?'success':'secondary'} onClick={()=>{setColor('green')}}>Green</Button>
        <Button variant='secondary' onClick={()=>setColor('blue')}>Blue</Button>
     </p>
    </Stack>
  )
}
/**
 * <button onClick={onIncrease}>증가</button>와 <button onClick={onIncrease(10)}>증가</button>의 차이점은 함수 호출 방식과 함수 실행 시점에 있습니다.

차이점 설명
<button onClick={onIncrease}>증가</button>:

onClick 속성에 onIncrease 함수 자체를 전달합니다. 즉, 버튼이 클릭될 때 onIncrease 함수가 호출됩니다.
<button onClick={onIncrease(10)}>증가</button>:

onClick 속성에 onIncrease(10) 함수 호출의 결과를 전달합니다. 이는 onClick이 클릭 이벤트 핸들러가 아니라 onIncrease(10) 함수 호출의 반환값이 됩니다. 만약 onIncrease(10)이 반환값을 가지지 않으면 (undefined를 반환) 이는 이벤트 핸들러로서 유효하지 않기 때문에 에러가 발생합니다.
해결 방법
함수에 인수를 전달하면서도 이벤트 핸들러로서 작동하게 하려면 함수 호출이 아닌 함수 정의를 전달해야 합니다. 이를 위해 화살표 함수를 사용하면 됩니다.
<button onClick={() => onIncrease(10)}>증가</button>
이 방법은 화살표 함수를 사용하여, 클릭 이벤트가 발생할 때 onIncrease(10)이 호출되도록 합니다. 화살표 함수는 이벤트 핸들러로 전달되며, 클릭 이벤트 시에만 onIncrease(10)을 호출하게 됩니다.
 */