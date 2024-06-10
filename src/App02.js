import MyComp from './component/ex02_1';
import YourComp from './component/ex02_2';
function App() {
    const user = {
        name: '김민아',
        email: 'kim@naver.com',
        age: 22,
    };
    return (
        <div className="container py-5">
            <h1>함수형 App 부모 Component</h1>
            <hr />
            <MyComp mycolor="yellow" mybgcolor="#c1b" mytxt="Good Job~" />
            <MyComp mybgcolor="#def" mycolor="hotpink" mytxt="반가워요" />
            <MyComp />
            <hr />
            <YourComp name="김연아" email="kim@gmail.com" age={23}></YourComp>
            <YourComp {...user} />
            {/* spread 연산자를 이용해 user객체를 펼쳐서 props로 자식컴포넌트에 전달할 수 있다. 아래와 동일 */}
            <YourComp name={user.name} email={user.email} age={user.age} />
            <br />
            <YourComp />
        </div>
    );
}
export default App;
