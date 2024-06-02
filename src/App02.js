import MyComp from "./component/ex02";
function App(){

    return (
        <div className="container py-5">
            <h1>함수형 App 부모 Component</h1>
            <hr/>
            <MyComp mycolor="yellow" mybgcolor="#c1b" mytxt="Good Job~"/>
            <MyComp mybgcolor="#def" mycolor="hotpink" mytxt="반가워요"/>
            <MyComp/>
        </div>
    )
}
export default App;

