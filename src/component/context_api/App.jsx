import { useState } from 'react';
export default function App() {
    const [nickname, setNickname] = useState('손흥민');
    return (
        <div className="container py-4 text-center">
            <div>
                <h3>상단메뉴</h3>
            </div>
            <div>
                {/* 컨텐츠- 프로필 */}
                <Profile userName={nickname} />
            </div>
            <div>
                <h3>하단 메뉴</h3>
            </div>
        </div>
    );
}
function Profile({ userName }) {
    return (
        <>
            <div className="alert alert-danger">
                <h4>My Profile</h4>
                <p>Profile에서는 userName 프로퍼티를 
                    사용하지 않고 자식 Greeting에게 
                    전달하는 역할만 한다</p>
                <Greeting userName={userName} />
            </div>
        </>
    );
}
function Greeting({ userName }) {
    return (
        <p>
            <h5 class="text-primary">안녕하세요? 
            저는 프런트개발자를 꿈꾸는 {userName} 입니다</h5>
        </p>
    );
}
