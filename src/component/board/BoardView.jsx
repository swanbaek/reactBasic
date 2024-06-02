import React, { useEffect, useState } from 'react';
import { useParams , Link ,useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axios from '../../lib/axiosCreate'
import {Row, Col, Button, Card} from 'react-bootstrap'
import {AiFillHeart, AiFillDislike, AiOutlineHeart,AiOutlineDislike} from 'react-icons/ai'
//react-icons  설치해야 사용 가능. npm i react-icons
const BoardView = () => {

    const { id } = useParams(); // /board2/:id와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [board, setBoard] = useState({});
    const navigate =useNavigate();
    const getBoard = async () => {
        console.log('getBoard()=============')
        try{
        const board = await axios.get(`/boardView/${id}`);    
        console.log('board: ',board)    
        setBoard(board.data[0]);
        }catch(err){
            alert('err: '+err.message)
        }
    }

    useEffect(() => {
        getBoard();
    },[id]);

    const onDelete = async() => {
        if(window.confirm(id + '번 게시글을 삭제하시겠습니까?')) {
            const board = await axios.get(`/boardDel/${id}`);
            //window.location.href = "/list";
            console.log('boardView board:',board)
            navigate('/board2')
        }
    }

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
        </div>
    );
}; 

export default BoardView;