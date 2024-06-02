import React,{useState, useRef} from 'react'
import {Form} from 'react-bootstrap'
export default function UseRefHook() {
    const [score, setScore]=useState('')
    const [name, setName]=useState('');
    const initValue=[];
    const [list, setList]=useState(initValue);
    const [avg, setAvg] = useState('')

    const myref1 = useRef(null);
    const myref2 = useRef(null);
    
    const getAvg=(arr)=>{
       if(arr.length==0) return 0;
        let sum=0;
        for(let i=0;i<arr.length;i++){
            sum+=Number(arr[i].score);
        }
        let avg=sum/arr.length;
       
        return avg;
    }

    const handleAdd=()=>{
        if(!name){
            alert('이름을 입력하세요');
            /////////////////
            myref1.current.focus();//입력 포커스 주기
            //////////////////
            return;
        }
        if(!score){
            alert('수학 성적을 입력하세요');
            /////////////////
            myref2.current.focus();
            //////////////////
            return;
        }
        if(isNaN(score)){
            alert('수학 점수는 숫자여야 해요');
            myref2.current.select();
            return;
        }

        const student={name,score};
        const arr=[... list, student];
        setList(arr);
        setName('');
        setScore('')
    }
    return (
        <div className="container py-4">
            <h2>useRef()훅 사용</h2>
            <br></br>        
        
        <Form.Group controlId="name"> 
                <Form.Label>학생명:</Form.Label>
                <Form.Control type="text" name="name" ref={myref1} placeholder='Name'
                 value={name} onChange={e=>setName(e.target.value)}/>
            </Form.Group>
        <hr/>
        <label htmlFor='score'>수학 점수:</label>    
        <input type="text" name="score" id="score"  ref={myref2} className="form-control" 
        value={score} onChange={(e)=>{setScore(e.target.value)}} placeholder='Score'/>    
        <br/>
        <button className="btn btn-success" onClick={handleAdd}>등  록</button>
        <ul className="list-group">
            { list.map((student, i)=>(
                <li className="list-group-item" key={i}>{student.name}: {student.score} 점</li>
            ))
            }    
        </ul>
        <br/>
        {/* <h1 className="text-danger">평균값: {getAvg(list)} </h1> 이리 하면 무한루프에 빠진다.getAvg 함수가 매 렌더링마다 호출되기 때문 */}
        <h1 className="text-danger">평균값:{getAvg(list).toFixed(2)} </h1>
        </div>
    )
}
