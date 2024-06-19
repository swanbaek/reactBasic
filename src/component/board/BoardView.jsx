import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Button, Card, Form, Modal } from 'react-bootstrap';
import { AiFillHeart, AiFillDislike } from 'react-icons/ai';
import ReplyList from './ReplyList';
import ReplyForm from './ReplyForm';
import ReplyEditForm from './ReplyEditForm';
const BoardView = () => {
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const [replies, setReplies] = useState([]);

    const [editingReply, setEditingReply] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    const getBoard = async () => {
        try {
            const board = await axios.get(`/boardView/${id}`);
            setBoard(board.data[0]);
        } catch (err) {
            alert('err: ' + err.message);
        }
    };

    const getReplies = async () => {
        try {
            const response = await axios.get(`/boards/${id}/replies`);
            setReplies(response.data);
        } catch (err) {
            console.error('Error fetching replies:', err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                //비동기적으로 수행하므로...게시글을 먼저 가져오고 댓글을 가져오려면 async, await를 사용
                await getBoard();
                await getReplies();
            } catch (error) {
                // 네트워크 오류 처리
                console.error('네트워크 오류:', error);
            }
        };

        fetchData();
    }, []);

    const onDelete = async () => {
        if (window.confirm(id + '번 게시글을 삭제하시겠습니까?')) {
            await axios.get(`/boardDel/${id}`);
            navigate('/board2');
        }
    };

    const addReply = async (newReply) => {
        try {
            await axios.post(`/boards/${id}/replies`, newReply);
            getReplies();
        } catch (err) {
            console.error('댓글 추가 Error ', err);
        }
    };

    const deleteReply = async (replyId) => {
        try {
            await axios.delete(`/replies/${replyId}`);
            getReplies();
        } catch (err) {
            console.error('댓글 삭제 Error', err);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingReply({ ...editingReply, [name]: value });
    };

    const startEditingReply = (reply) => {
        setEditingReply(reply);
        setShowEditModal(true);
    };

    const updateReply = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/replies/${editingReply.num}`, editingReply);
            setShowEditModal(false);
            setEditingReply(null);
            getReplies();
        } catch (err) {
            console.error('댓글 수정 Error ', err);
        }
    };

    return (
        <div className="board-view">
            <Row className="my-5">
                <Col className="px-5">
                    <h1 className="my-5 text-center">Board View [No. {id}]</h1>
                    <div className="text-end my-2">
                        <Link to={`/boardEdit/${id}`}>
                            <Button className="btn mx-2">수정</Button>
                        </Link>
                        <Button className="btn" variant="danger" onClick={onDelete}>
                            삭제
                        </Button>
                    </div>
                    <Card>
                        <Card.Body>
                            <h5>
                                [{board.id}] {board.title}
                            </h5>
                            <hr />
                            <div className="cArea">
                                {board.content}
                                <br />
                                <AiFillHeart style={{ color: 'hotpink' }} />
                                <AiFillDislike style={{ color: 'green' }} />
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            Created on {board.wdate} by {board.name}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row className="my-5">
                <Col className="px-5">
                    <Button className="btn mt-4" variant="secondary" onClick={() => navigate('/board2')}>
                        {' '}
                        Board List전체출력{' '}
                    </Button>

                    <h3 className="mt-5">댓글영역</h3>
                    <ReplyList replies={replies} startEditingReply={startEditingReply} deleteReply={deleteReply} />
                </Col>
            </Row>
            <Row className="my-5">
                <Col className="px-5">
                    <h3 className="mt-4"> 댓글추가 </h3>
                    <ReplyForm addReply={addReply} />
                </Col>
            </Row>
            <Row className="my-5">
                <Col className="px-5">
                    <ReplyEditForm
                        showEditModal={showEditModal}
                        setShowEditModal={setShowEditModal}
                        updateReply={updateReply}
                        editingReply={editingReply}
                        handleEditInputChange={handleEditInputChange}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default BoardView;
