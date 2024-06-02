import { useState} from 'react'
export default function MyComp(){

    let bgcolor='orange';//그냥 데이터

    const [mycolor, setMyColor] = useState('green');//state 데이터
    const [ flag, setFlag] = useState(false);

    const handleClick1=()=>{ 
        
        bgcolor='skyblue'
        console.log('bgcolor: ',bgcolor)
        //bgcolor를 변경해도 화면이 다시 그려지지 않음(렌더링되지는 않음)
    }
    function handleClick2(){

        let cr=flag? 'yellow':'green';
        //setMyColor('yellow')
        setMyColor(cr);
        setFlag(!flag)

    }

    return (
        <div className="container py-5">
            <button className='btn' style={{backgroundColor:bgcolor}} onClick={handleClick1}>좋아요1 배경색은 {bgcolor}</button>
            <button className='btn' style={{backgroundColor:mycolor}} onClick={handleClick2}>좋아요2</button>
        </div>
    )

}