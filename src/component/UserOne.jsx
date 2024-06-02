import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
//fetch api 이용

export default function UserOne() {
 
  const {id}  =useParams();
  const [user, setUser] =useState(null)

  const getUserInfo =()=>{
    // fetch('https://reqres.in/api/users/2')
    //then()메서드는 프로미스를 하나 반환하며 여러 개 체인으로 연결 가능하다. 즉 여러 비동기 작업을 순서대로 실행할 수 있다.
    fetch(`https://reqres.in/api/users/${id}`)
    .then(response=>response.json()) 
    .then(data=>{ 
        console.log(data.data)
        if(!data.data){
            alert('해당 회원 정보는 없습니다');
            return;
        }
        const tmpUser ={... data.data};
        setUser(tmpUser)
    })
    .catch(error=>{
        alert(error.message)
            console.error(error)
    })
  }

  //async/await를 이용한 예
  const getUserInfo2=async()=>{
    try{
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        if(!response.ok){
            alert('error');
            return;
        }
        const data= await response.json();
        console.log(data.data)
        if(!data.data){
            alert('해당 회원 정보는 없습니다');
            return;
        }
        setUser(data.data)
    }catch(error){
        alert(error.message)
            console.error(error)
    }
  }

  useEffect(()=>{
    //getUserInfo();
    getUserInfo2();
  },[id])
//useEffect의 두 번째 매개변수로 전달되는 배열(dependency array)에 id를 넣는다. 
//그 이유는 id가 변경될 때마다 getUserInfo 함수를 호출하여 새로운 사용자 정보를 가져오기 위함
// getUserInfo 함수는 id에 의존하므로, id를 명시적으로 배열에 넣어 의존성을 명확하게 하는 것이 좋습니다
// 하지만 :id를 이용해 동적 세그먼트 할당으로  id값을 넣어주면 빈배열[]을 useEffect에 전달해도 새로운 데이터를 렌더링한다
// 컴포넌트는 URL이 변경될 때마다 React Router의 재마운트로 인해 렌더링되고 데이터를 가져옵니다. 
// 그러나 useEffect의 의존성 배열에 id를 명시적으로 포함하는 것이 더 명확하고 최선의 관행입니다
  return (
    <div>
        <h1>회원 정보</h1>
        {
            user!=null &&<div>
             <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={user.avatar}
                />
                <Figure.Caption>
                {user.first_name} {user.last_name} 
                </Figure.Caption>
                </Figure>    
            {/* <img src={user.avatar} alt={user.first_name}></img>     */}
            <h3>Id: {user.id} </h3>
            <h3>Name: {user.first_name} {user.last_name} </h3>
            <h3>Email: {user.email} </h3>
            </div>
        }
    </div>
  )
}
