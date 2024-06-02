import React,{useState} from 'react'
import { Stack,Form, Button } from 'react-bootstrap'
export default function MyEventComp2() {

    const [form, setForm]=useState({name:'',email:''})

    const handleReset= ()=>{
        setForm({...form,name:'', email:''})
        
     }

     const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
        // ...form : 기존 form객체의 모든 속성을 복사한다. 기존 객체를 복사하여 그 복사된 객체를 수정하고 이를 이용해 적용하여 새로운 객체를 만든다. 
        //리액트는 이런방식으로 함
        /*계산된 속성 이름 ([e.target.name]: e.target.value):
        [1] e.target은 이벤트가 발생한 dom요소를 의미. 여기서는 e.target이 input이 된다.
        [2] e.target.name은 이벤트가 발생한 input의 name속성값을 나타낸다.
        name="name"이라면 e.target.name은 'name'이 된다.
        [3] e.target.value는 이벤트가 발생한 요소의 현재 값
        [e.target.name]: e.target.value는 계산된 속성 이름을 사용하여 객체의 키를 동적으로 설정합니다. 
        예를 들어, e.target.name이 "email"이고 e.target.value가 "test@example.com"이라면, 
        이 구문은 { email: "test@example.com" }을 의미
        -----------------
        [e.target.name] : 여기에 []를 붙이는 이유는? 계산된 속성명(computed property names) 기능 문법이다.
        #es6에 도입된 계산된 속성 이름 사용. =>속성의 이름을 동적으로 정의할 수 있게 해주는 기능
        const key = "name";
    const obj = {
      [key]: "John"
    };
    console.log(obj); // { name: "John" }
    ------------------------
    const handleChange = (e) => {
      setForm({ ...form, e.target.name: e.target.value });
    } ==> 이렇게 한다면 자바스크립트에서 아래와 같이 해석된다.
    const handleChange = (e) => {
      setForm({ ...form, "e.target.name": "test@example.com" });
    };
    결과적으로 form 객체는 { ..., "e.target.name": "test@example.com" }와 같은 형태가 됩니다
         */
     }
    
    const {name,userId,email} =form;
    
    const handleSubmit= async(e)=>{
    // alert('a')
        e.preventDefault();
        if(!name){
            alert('이름을 입력하세요');
            return;
        }
        if(!userId){
            alert('아이디를 입력하세요');
            return;
        }
        if(!email){
            alert('이메일을 입력하세요');
            return;
        }
        let yn=window.confirm('등록하시겠습니까?');
        if(yn){
            window.location.href='/'
        }
        // if(yn){
        //     try{       
        //         const response= await fetch('/insert',{
        //         method: 'POST', // POST 요청임을 명시
        //         headers: {
        //         'Content-Type': 'application/json', // JSON 데이터 전송을 명시
        //         }, body:JSON.stringify(form),})
        //         if(!response.ok){
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }
        //         const data = await response.json();
        //         console.log('Success:', data);
        //     }catch(err){
        //         alert('error: '+err.message)
        //     }
        // }
    }

    return (
        <Stack gap={3} className="col-md-8 mx-auto py-5">                  
          <Form  onSubmit={handleSubmit}>
            <h1>입력 양식(Input) 여러개 있을 때</h1>
            <Form.Group controlId="frmName"> 
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" name="name" placeholder='Name' value={name} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="frmEmail">
                <Form.Label>User ID:</Form.Label>
                <Form.Control type="text" name="userId" placeholder='User ID' value={userId}  onChange={handleChange}/>
            </Form.Group>
    
            <Form.Group controlId="frmEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" name="email" placeholder='Email' value={email}  onChange={handleChange}/>
            </Form.Group>
    
            <Button variant="secondary" type="submit" className="my-2">
                Submit
            </Button>
            <Button variant="secondary" type="reset" className="my-2" onClick={handleReset}>
                Reset
            </Button>        
          </Form>
          
        </Stack>
      )
}
