import Comment from "./component/ex07";
import {useState} from 'react';
function App(){
    let arr=[
        {name:'홍길동',title:'네 힘차게 달려봐요~'},
        {name:'이영희',title:'점심 먹고나니 졸립니다~'},
        {name:'김창섭',title:'저두 그래요 눈꺼풀이 무겁습니다 ㅜ'},

    ];
    const [ items, setItems]=useState(arr);

 
        
    return (
        
        <div className="container py-5">
            <h1>오늘도 즐거운 하루 되세요</h1>
            <hr/> 
            {items.map((item, index)=>{
                return (
                    <Comment key={index} name={item.name} title={item.title}/>
                )
            })}
        </div>
        
    )
}
export default App;

