import React,{useState, useRef} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
const BoardForm = ({onWrite}) => {
    const data={
        title:'',
        name:'',
        content:'',
    }
    const [form, setForm] =useState(data);
    const {title,name,content}=form;

    const refTitle=useRef();
    const refName=useRef();
    const refContent=useRef();

    const onChangeHandler=(e)=>{
        const frm={...form, [e.target.name]:e.target.value};
        setForm(frm);
    }
    const onSubmitHandler=(e)=>{
        if(!title){
            alert('제목을 입력하세요');
            refTitle.current.focus();
            return;
        }
        if(!name){
            alert('작성자를 입력하세요');
            refName.current.focus();
            return;
        }
        if(!content){
            alert('글 내용을 입력하세요')
            refContent.current.focus();
            return;
        }
        onWrite(form);//state 데이터를 부모로 부터 받은 props onWrite로 보낸다.
    }
    const onResetHandler=()=>{
        setForm({...form, title:'',name:'',content:''})
    }

    return (
        <Row className='my-1'>
            <Col className='p-3' md={8} className="mx-auto">
                <h1 className='text-center my-5'>Board Write</h1>
                <Form>                    
                    <h4>제목</h4>
                    <Form.Control placeholder='제목을 입력하세요.' ref={refTitle}
                        className='my-3' name='title' value={title} onChange={onChangeHandler} />
                    
                    <h4>작성자</h4>
                    <Form.Control placeholder='작성자를 입력하세요.' ref={refName}
                        className='my-3' name='name' value={name} onChange={onChangeHandler} />

                    <h4>내용</h4>
                    <Form.Control as='textarea' rows={7} placeholder='내용을 입력하세요.' ref={refContent}
                        className='my-3' name='content' value={content} onChange={onChangeHandler} />

                    <div className='text-center'>
                        <Button className='mx-1 px-3' onClick={onSubmitHandler}>글쓰기</Button>
                        <Button className='mx-1 px-3' onClick={onResetHandler} variant='warning'>다시쓰기</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    );
};

export default BoardForm;