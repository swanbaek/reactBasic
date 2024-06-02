import {useState} from 'react';

export default function Profile() {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');
    /** input value에 state값을 할당하는 이유는. 상태 값과 입력 값이 일치하므로, 
     * 애플리케이션 상태를 예측 가능하고 일관되게 유지할 수 있습니다.
       모든 상태 변경이 React의 상태 관리 체계 내에서 이루어지므로, 디버깅이 용이합니다. 
       value 속성을 설정하지 않으면 상태와 입력 필드의 값이 일치하지 않을 수 있으며, 이는 애플리케이션의 일관성을 해칠 수 있습니다.
       유효성 검사 및 조건부 렌더링 어려움: 제어 컴포넌트를 사용하지 않으면 입력 값의 유효성 검사가 어렵고, 상태에 따른 조건부 렌더링이 복잡해질 수 있습니다.
       */
  
    return (
      <div className="container py-5">
        <input type="text"  onChange={e => setName(e.target.value)} placeholder="Name" />
        <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value))} placeholder="Age" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <hr/>
        <h3 className="text-primary">이름: {name}, 나이: {age}, 이메일: {email}</h3>
      </div>
    );
  }