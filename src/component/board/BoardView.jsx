import React, { useEffect, useState } from 'react';
import { useParams , Link ,useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../../lib/axiosCreate'
import {Row, Col, Button, Card, Form} from 'react-bootstrap'
import {AiFillHeart, AiFillDislike, AiOutlineHeart,AiOutlineDislike} from 'react-icons/ai'
//react-icons  설치해야 사용 가능. npm i react-icons
const BoardView = (props) => {
  
    const { id } = useParams(); // /board2/:id와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [board, setBoard] = useState({});

    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState({ writer: '', memo: '' });

    const navigate =useNavigate();
    const getBoard = async () => {
        console.log('getBoard()=============')
        try{
        const board = await axios.get(`/boardView/${id}`);    
        console.log('board: ',board)    
        setBoard(board.data[0]);
        
        console.log('onMode====',props)
        }catch(err){
            alert('err: '+err.message)
        }
    }

    useEffect(() => {
        getBoard();
        getReplies();
       
    },[id]);

    const onDelete = async() => {
        if(window.confirm(id + '번 게시글을 삭제하시겠습니까?')) {
            const board = await axios.get(`/boardDel/${id}`);
            //window.location.href = "/list";
            console.log('boardView board:',board)
            navigate('/board2')
        }
    }

    // 리플라이 목록 가져오기
    const getReplies = async () => {
        try {
            const response = await axios.get(`/boards/${id}/replies`);
            setReplies(response.data);
        } catch (err) {
            console.error('Error fetching replies:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReply({ ...newReply, [name]: value });
    };

    const addReply = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/boards/${id}/replies`, newReply);
            setNewReply({ writer: '', memo: '' });
            getReplies();
        } catch (err) {
            console.error('댓글등록 Error: ', err);
        }
    };

    return (
        
        <div className="board-view">
            <Row className='my-5'>
            <Col className='px-5'>
                <h1 className='my-5 text-center'>Board View [No. {id}]</h1>
                <div className='text-end my-2'>
                    <Link to={`/boardEdit/${id}`}>
                        <Button className='btn mx-2'>수정</Button>
                    </Link>
                    <Button className='btn' variant='danger'
                        onClick={onDelete}>삭제</Button>
                </div>
                <Card>
                    <Card.Body>
                        <h5>[{board.id}] {board.title}</h5>
                        <hr/>
                        <div className='cArea'>{board.content}
                        <br></br>
                        <Link><AiOutlineHeart style={{color:'hotpink', fontSize:'1.2em'}}/></Link>
                        <Link><AiOutlineDislike style={{color:'green', fontSize:'1.2em'}}/></Link>
                        </div>

                    </Card.Body>
                    <Card.Footer>
                        Created on {board.wdate} by {board.name}
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        <Row className='my-5'>
            <Col className='px-5'>
            <h2 className="mt-5"> 댓글영역  </h2> 
                    <ul className="list-group">
                        {replies.map(reply => (
                            <li key={reply.num} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{reply.writer}:</strong> {reply.memo}
                                    <br />
                                    <small>{reply.reg_date}</small>
                                </div>
                                <div>
                                    <Button variant="info" size="sm" className="mx-1" >Edit</Button>
                                    <Button variant="danger" size="sm" >Delete</Button>
                                </div>
                            </li>
                        ))}
                    </ul>

            </Col>
        </Row> 
             {/* 댓글 쓰기 폼============================= */}
         <Row className='my-5'>
            <Col className='px-5'>
            <h3 className="mt-4">댓글추가</h3>
                    <Form onSubmit={addReply}>
                        <Form.Group className="mb-3">
                            <Form.Label>작성자</Form.Label>
                            <Form.Control
                                type="text"
                                name="writer"
                                value={newReply.writer}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>댓글</Form.Label>
                            <Form.Control
                                type="text"
                                name="memo"
                                value={newReply.memo}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit">댓글저장</Button>
                    </Form>
            </Col>
        </Row>        
        </div>
    );
}; 

export default BoardView;