import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { students } from '../data/data';
/**useParams 훅은 URL 경로에서 동적 세그먼트를 가져오는 데 사용된다. 
 * 예를 들어, /users/:id와 같은 경로가 있을 때, :id 부분은 동적 파라미터로 간주된다. 
 * useParams를 사용하면 이 파라미터 값을 쉽게 가져올 수 있다. */
const UserDetail = () => {

    const { id } = useParams();
    const [user, setUser]=useState(null);
    /*useEffect()훅은 함수 컴포넌트에서 보조작업(side-effect)을 수행할 수 있다
    보조작업의 예로는 DB에 요청을 보내 데이터를 받아오는 일 등이다
    =>나중에 훅에서 자세히 다뤄보자 */

    useEffect(()=>{
        const findUser=students.find((user)=> user.id===Number(id));
        //배열의 find()함수: 해당 조건을 만족하는 첫번째 요소를 반환한다. 없으면 undefined를 반환
        console.log("findUser: ",findUser)
        setUser(findUser);
    },[id])
    //useEffect()가 2번 실행=>버그?
    /** React 18에서는 StrictMode가 개발 모드에서 일부 부작용을 두 번 실행하여 부작용이 순수하지 않거나 
     * 안정적이지 않은 코드를 찾는 데 도움이 되도록 설계되었습니다. 
     * 이로 인해 개발 모드에서 useEffect가 두 번 실행될 수 있습니다. 프로덕션 모드에서는 발생하지 않음
     * StrictMode를 주석 처리하면 1번만 실행되며,*/

    return (
        <div className='param1 comp'>
            <h2>요청 id : {id}</h2>
            <h3 className="text-primary">{id}번 회원 정보를 DB에서 가져와 여기에 보여줄 예정입니다</h3>
            {user?(
            <div className="alert alert-success">
                <h2>User Info</h2>
                <h3>Name: {user.name}</h3>
                <h3>Age: {user.age}</h3>
                <h3>Adress: {user.addr}</h3>
                {/* 기타 사용자 정보 표시 */}
             </div>
            ):(
                <div className="alert alert-danger">
                <h3> { id}번 회원 정보는 없습니다.</h3>
                </div>

            )
            }
        </div>
    );
};

export default UserDetail;