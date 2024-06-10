import { useState } from 'react';
export default function HerComp() {
    const [isLogin, setLogin] = useState(false);
    const [id, setId] = useState('수철');
    const handleClick = () => {
        // alert('hi');
        // setLogin(!isLogin);//이 방식은 비동기적으로 이뤄지므로, 이전 상태값이 정확하지 않을 수도 있다.

        setLogin((prev) => !prev);
        //React는 현재 상태 값을 인자로 전달하고, 이 값을 기반으로 새 상태 값을 설정합니다.
        // 이 방법은 상태 업데이트가 이전 상태 값에 따라 정확하게 이루어지도록 보장합니다.
    };
    return (
        <>
            {isLogin ? <h3>{id}님 로그인 중</h3> : <h3>로그인을 하세요</h3>}
            <button className="btn btn-success" onClick={handleClick}>
                Toggle
            </button>
        </>
    );
}
