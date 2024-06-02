import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../../lib/axiosCreate'
import { Row, Col, Form, Button } from 'react-bootstrap'


const BoardModify = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState({});
    const getBoard = async () => {
        const board = await (await axios.get(`/boardView/${id}`));
        console.log('board: ',board)
        setBoard(board.data[0]);
        setForm(board.data[0])
    };
    useEffect(() => {
        getBoard();
    },[]);
    
    
    const [form, setForm] = useState({
        title: '',
        content: '',
        name: ''
    });

    const { title, content, name } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onReset = () => {
        setForm({
            ...form,
            title: '',
            content: '',
            name: ''
        });
    }

    const onSubmit = async () => {
        if (title === '') {
            alert('제목을 입력하세요!');
        } else if (content === '') {
            alert('내용을 입력하세요!');
        } else {
            if (window.confirm('게시글을 수정하시겠습니까?')) {
                await axios.post(`/boardModify/${id}`, form);
                navigate('/board2')
            }
        }
    }

    

    return (
        <Row className='my-1'>
            <Col className='p-3'  md={8} className="mx-auto">
                <h1 className='text-center my-5'>Board Modify</h1>
                <Form>
                    <h4>제목</h4> <Form.Control placeholder={board.title}
                        className='my-3' name='title' value={title} onChange={onChange} />

                    <h4>작성자</h4><Form.Control placeholder={board.name}
                        className='my-3' name='name' value={name} onChange={onChange} />

                    <h4>내용</h4><Form.Control as='textarea' rows={7} placeholder={board.content}
                        className='my-3' name='content' value={content} onChange={onChange} />
                    <div className='text-center'>
                        <Button className='mx-2 px-3 btn-sm'
                            onClick={onSubmit}>글수정</Button>
                        <Button className='mx-2 px-3 btn-sm'
                            onClick={onReset} variant='warning'>다시쓰기</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    );
};

export default BoardModify;