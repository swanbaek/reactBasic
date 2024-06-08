import { useContext, useState, createContext } from 'react';
const UserContext = createContext('unknown');
//createContext()함수를 호출하면 컨텍스트 객체가 생성된다.
//createContext()함수의 구조는 아래와 같다
//React.createContext(기본값) => {Provier, Consumer}
export default function App3() {
    const [nickname, setNickname] = useState('이프로');
    const onChange = (e) => {
        const userName = e.target.value;
        setNickname(userName);
    };
    return (
        <div className="container py-4">
            <UserContext.Provider value={nickname}>
                <h1>App</h1>
                <label htmlFor="nickname">닉네임:</label>
                <input type="text" name="nickname" id="nickname"
                 onChange={onChange} className="form-control" />
                <hr />
                <Profile />
            </UserContext.Provider>
        </div>
    );
}
function Profile() {
    return (
        <>
            <div className="alert alert-warning">
                <h4>My Profile</h4>
                <p>Context를 이용해 데이터를 전달받습니다.</p>
                <Greeting />
            </div>
        </>
    );
}
//useContext()훅을 이용해 Consumer없이 데이터를 받아 사용해보자.
function Greeting() {
    const nickname = useContext(UserContext);
    return (
        <p>
            <h5 class="text-success">안녕하세요? 
            저는 프런트개발자를 꿈꾸는 {nickname} 입니다</h5>
        </p>
    );
}
